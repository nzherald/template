module Main exposing (..)

import Browser
import Browser.Dom exposing (Element, getElement)
import Browser.Events exposing (onResize)
import Builder exposing (Annotate, AnnotateState, buildSvg, isNode, simpleBuildNoStyleNodes)
import Css exposing (..)
import Css.Global as G
import Dict
import Html.Styled exposing (Html, div, fromUnstyled, h1, img, text, toUnstyled)
import Html.Styled.Attributes as A exposing (css, id)
import Html.Styled.Lazy exposing (lazy)
import Http
import Json.Decode as D
import Json.Decode.Pipeline as D
import Loaders
import Result.Extra as Result
import Task
import TypedSvg.Core exposing (Attribute)
import TypedSvg.Events exposing (on)
import VirtualDom exposing (Handler(..))
import XmlParser as X



---- MODEL ----


type alias Model =
    { chart : Chart
    , chartsvg : X.Node
    , width : Float
    , initialLoad : Bool
    }


type alias Chart =
    { label : ChartType
    , normal : String
    , small : String
    , idstr : String
    }


type ChartType
    = ChartOne
    | ChartTwo
    | Error


chart : String -> ChartType
chart d =
    case d of
        "ChartOne" ->
            ChartOne

        "ChartTwo" ->
            ChartTwo

        _ ->
            Error


flagDecoder : D.Decoder Chart
flagDecoder =
    D.map4 Chart
        (D.field "chart" D.string |> D.map chart)
        (D.field "normal" D.string)
        (D.field "small" D.string)
        (D.field "chart" D.string |> D.map ((++) "sdffgs"))


init : D.Value -> ( Model, Cmd Msg )
init flags =
    case D.decodeValue flagDecoder flags of
        Err e ->
            -- let
            --     ee =
            --         Debug.log "" e
            -- in
            ( Model (Chart Error "" "" "") (X.Text "") 320 False, Cmd.none )

        Ok c ->
            ( Model c (X.Text "") 0 False, Task.attempt RootWidth (getElement c.idstr) )



---- UPDATE ----


type Msg
    = GotPlot (Result Http.Error String)
    | GotNewWidth
    | RootWidth (Result Browser.Dom.Error Element)
    | Click String String String Float Float


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Click dhb day n x y ->
            let
                ll =
                    Debug.log dhb ( x, y )
            in
            ( model, Cmd.none )

        GotNewWidth ->
            ( model, Task.attempt RootWidth (getElement model.chart.idstr) )

        GotPlot rs ->
            ( { model
                | chartsvg =
                    Result.map (X.parse >> Result.mapError (\_ -> "Decode error")) rs
                        |> Result.mapError (\_ -> "Http error")
                        |> Result.join
                        |> Result.map .root
                        |> Result.withDefault (X.Text "")
                , initialLoad = True
              }
            , Cmd.none
            )

        RootWidth (Ok { element }) ->
            ( { model | width = element.width }
            , if element.width >= 500 && model.width < 500 then
                getSvgFile model.chart.normal

              else if element.width < 500 && (model.width >= 500 || model.width == 0) then
                getSvgFile model.chart.small

              else
                Cmd.none
            )

        RootWidth (Err e) ->
            ( model, Cmd.none )



---- VIEW ----


globalStyleDetail =
    [ property "fill" "none"
    , property "stroke" "#000"
    , property "stroke-linecap" "round"
    , property "stroke-linejoin" "round"
    , property "stroke-miterlimit" "10.00"
    ]


view : Model -> Html Msg
view model =
    div
        [ id model.chart.idstr
        , A.class "nzh-datavis"
        , css [ position relative ]
        ]
        [ if model.initialLoad then
            case model.chart.label of
                ChartOne ->
                    chartOne model

                ChartTwo ->
                    chartTwo model

                Error ->
                    div [] []

          else
            div [ css [ displayFlex, justifyContent center ] ]
                [ Loaders.spinningCircles 60 "#ecac0c" |> fromUnstyled
                ]
        ]


chartOne model =
    div
        [ css
            [ G.descendants
                [ G.polygon globalStyleDetail
                , G.path globalStyleDetail
                , G.circle globalStyleDetail
                , G.line globalStyleDetail
                , G.polyline globalStyleDetail
                , G.rect globalStyleDetail
                , G.svg [ height (px 1920), margin4 (px 15) auto (px 15) (px 0), width (pct 100) ]
                ]
            ]
        ]
        [ lazy (simpleBuildNoStyleNodes >> fromUnstyled) model.chartsvg ]


chartTwo model =
    div [] [ lazy (buildSvg [ removeTextStroke, removeRootDims, interact ] >> fromUnstyled) model.chartsvg ]


isTextNode =
    isNode "text"


isRoot =
    isNode "svg"


isRect =
    isNode "rect"


myClick : String -> String -> String -> Attribute Msg
myClick dhb day n =
    on "click" (D.map2 (Click dhb day n) (D.at [ "layerX" ] D.float) (D.at [ "layerY" ] D.float) |> Normal)


interact : Annotate Msg
interact =
    Annotate isRect addClick


addClick : AnnotateState Msg -> AnnotateState Msg
addClick a =
    let
        ( use, pass ) =
            List.partition (\{ name } -> String.startsWith "data-" name) a.xattrs

        dataAttrs =
            List.map (\attr -> ( String.replace "data-" "" attr.name, attr.value )) use
                |> Dict.fromList

        clicker =
            Maybe.map3 myClick
                (Dict.get "dhb" dataAttrs)
                (Dict.get "date" dataAttrs)
                (Dict.get "n" dataAttrs)
    in
    { a
        | attrs =
            Maybe.map (\c -> c :: a.attrs) clicker
                |> Maybe.withDefault a.attrs
        , xattrs = pass
    }


removeTextStroke : Annotate Msg
removeTextStroke =
    Annotate isTextNode
        (\a ->
            { a
                | xattrs =
                    List.filter
                        (\{ name } -> not <| String.startsWith "stroke" name)
                        a.xattrs
            }
        )


removeRootDims : Annotate Msg
removeRootDims =
    Annotate isRoot
        (\a ->
            { a
                | xattrs =
                    List.filter
                        (\{ name } -> name /= "width" && name /= "height")
                        a.xattrs
            }
        )



---- PROGRAM ----


main : Program D.Value Model Msg
main =
    Browser.element
        { view = view >> toUnstyled
        , init = init
        , update = update
        , subscriptions = subscriptions
        }


subscriptions : Model -> Sub Msg
subscriptions model =
    onResize (\_ _ -> GotNewWidth)


getSvgFile url =
    Http.get { url = url, expect = Http.expectString GotPlot }
