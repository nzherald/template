module Builder exposing (..)

import TypedSvg exposing (g, svg)
import TypedSvg.Core exposing (..)
import XmlParser as X


simpleBuild : X.Node -> Svg msg
simpleBuild xmlNode =
    case xmlNode of
        X.Element label attrs nodes ->
            node label
                (List.map (\{ name, value } -> attribute name value) attrs)
                (List.map simpleBuild nodes)

        X.Text str ->
            text str


type alias Annotate msg =
    { test : X.Node -> Bool
    , transform : AnnotateState msg -> AnnotateState msg
    }


type alias AnnotateState msg =
    { xattrs : List X.Attribute
    , attrs : List (Attribute msg)
    , xnodes : List X.Node
    }


buildSvg : List (Annotate msg) -> X.Node -> Svg msg
buildSvg annotations xmlNode =
    case xmlNode of
        X.Element label xattrs xnodes ->
            let
                annotate =
                    List.filter (\a -> a.test xmlNode) annotations

                transformed =
                    List.foldl (<|) (AnnotateState xattrs [] xnodes) (List.map .transform annotate)

                attrs =
                    List.map (\{ name, value } -> attribute name value) transformed.xattrs
                        ++ transformed.attrs

                nodes =
                    List.map (buildSvg annotations) transformed.xnodes
            in
            node label attrs nodes

        X.Text str ->
            text str


isStyleNode : X.Node -> Bool
isStyleNode =
    isNode "style"


isNode : String -> X.Node -> Bool
isNode label xnode =
    case xnode of
        X.Element n _ _ ->
            n == label

        _ ->
            False


removeStyleNodes =
    Annotate isStyleNode (\a -> { a | xnodes = [] })


simpleBuildNoStyleNodes : X.Node -> Svg msg
simpleBuildNoStyleNodes =
    buildSvg [ removeStyleNodes ]
