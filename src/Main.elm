module Main exposing (main)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Time
import Task


-- MAIN

main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


-- MODEL

type alias Model =
    { currentTime : Time.Posix
    , zone : Time.Zone
    , status : String
    }


init : () -> (Model, Cmd Msg)
init _ =
    ( { currentTime = Time.millisToPosix 0
      , zone = Time.utc
      , status = "running"
      }
    , Task.perform AdjustTimeZone Time.here
    )


-- UPDATE

type Msg
    = Tick Time.Posix
    | AdjustTimeZone Time.Zone


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        Tick newTime ->
            ( { model | currentTime = newTime }
            , Cmd.none
            )
        
        AdjustTimeZone newZone ->
            ( { model | zone = newZone }
            , Cmd.none
            )


-- SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions _ =
    Time.every 1000 Tick


-- VIEW

view : Model -> Html Msg
view model =
    div [ style "font-family" "Arial, sans-serif", style "padding" "20px" ]
        [ h1 [] [ text "Welcome to Testing Sessions Server" ]
        , p [] [ text "This is a simple Elm application." ]
        , p [] [ text "Available endpoints:" ]
        , ul []
            [ li [] [ a [ href "#" ] [ text "/ - This home page" ] ]
            , li [] [ a [ href "#status" ] [ text "/api/status - Server status" ] ]
            , li [] [ a [ href "#time" ] [ text "/api/time - Current server time" ] ]
            ]
        , hr [] []
        , viewStatus model
        , hr [] []
        , viewTime model
        ]


viewStatus : Model -> Html Msg
viewStatus model =
    div []
        [ h2 [] [ text "Server Status" ]
        , p [] [ text ("Status: " ++ model.status) ]
        , p [] [ text "Message: Server is working correctly" ]
        , p [] [ text ("Timestamp: " ++ formatTime model.zone model.currentTime) ]
        ]


viewTime : Model -> Html Msg
viewTime model =
    div []
        [ h2 [] [ text "Current Server Time" ]
        , p [] [ text ("Time: " ++ formatTime model.zone model.currentTime) ]
        , p [] [ text ("Timestamp: " ++ String.fromInt (Time.posixToMillis model.currentTime)) ]
        ]


formatTime : Time.Zone -> Time.Posix -> String
formatTime zone time =
    let
        year = String.fromInt (Time.toYear zone time)
        month = String.fromInt (toMonthNumber (Time.toMonth zone time))
        day = String.fromInt (Time.toDay zone time)
        hour = String.fromInt (Time.toHour zone time)
        minute = String.fromInt (Time.toMinute zone time)
        second = String.fromInt (Time.toSecond zone time)
        
        padZero str =
            if String.length str == 1 then
                "0" ++ str
            else
                str
    in
    year ++ "-" ++ padZero month ++ "-" ++ padZero day ++ "T" 
        ++ padZero hour ++ ":" ++ padZero minute ++ ":" ++ padZero second


toMonthNumber : Time.Month -> Int
toMonthNumber month =
    case month of
        Time.Jan -> 1
        Time.Feb -> 2
        Time.Mar -> 3
        Time.Apr -> 4
        Time.May -> 5
        Time.Jun -> 6
        Time.Jul -> 7
        Time.Aug -> 8
        Time.Sep -> 9
        Time.Oct -> 10
        Time.Nov -> 11
        Time.Dec -> 12
