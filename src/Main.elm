module Main exposing (..)

import Browser
import Html exposing (Html, div, h1, img, text)
import Html.Attributes exposing (src)



---- MODEL ----


type alias Model =
    {}

type alias Flags =
    { }

init : Flags -> ( Model, Cmd Msg )
init { } =
    ( {}, Cmd.none )



---- UPDATE ----


type Msg
    = NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )



---- VIEW ----


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "Your Elm App is working!" ]
        ]



---- PROGRAM ----


main : Program Flags Model Msg
main =
    Browser.element
        { view = view
        , init = init
        , update = update
        , subscriptions = always Sub.none
        }
