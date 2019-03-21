// // import { InMemoryDbService } from 'angular-in-memory-web-api';
// export class RootJsonInMemoryDataService implements InMemoryDbService {
//   createDb() {
//     const rootJson =
//         {
//           "DrawDirection":"1", "HelperPercent":"0.6", "ReSeqSetting":"0", "CustomerEditPermission": "True", "RouteEditPermission": "True", "DateFormat":3, "TimeFormat":1, "Language":"", "ShowProductPickTypesetting":"", "ShowColumn":"Product Pick Type", "Routes":
//           [
//             {
//               "LoadSheetID":"12448",
//               "Status":"1",
//               "PlanID":"6769",
//               "CostPerMile":"",
//               "PlanDate":"3/2/2018",
//               "PickUnits":"PKG^KEG^Total",
//               "StartTime":"6:00 PM",
//               "EndTime":"0",
//               "Duration":0,
//               "OldServiceTime":0.00,
//               "OldDistance":0.000000,
//               "LoadSheetNum":"12448",
//               "Employee":"lukeb",
//               "Route":"Rep Route",
//               "RouteID":"354",
//               "RouteNum":"0",
//               "LSDate":"3/2/2018",
//               "Address":"54 Hunter Road",
//               "Address2":"Derrimut",
//               "City":"Melbourne",
//               "State":"VIC",
//               "PostalCode":"3030",
//               "Helper":"False",
//               "MaxCargoWeight":"1000",
//               "PalletCount":"1",
//               "StartMapPointID":"1",
//               "EndMapPointID":"1",
//               "Color":"0000FF",
//               "LocationID":"1",
//               "Company":"",
//               "Stops":
//                 [
//                   {
//                     "StopID":"395444"  , "CustomerID":"101095"  , "EventID":"395444"  , "NumUnitsStr":"2^0^2^" , "LoadSheetPhase":"3"  , "UserName":"THECARLTON"  , "Date":"3/2/2018"  , "Company":"THE CARLTON WINE ROOM"  , "Address":"172-174 FARADAY ST"  , "Address2":""  , "City":"CARLTON"  , "State":"VIC"  , "PostalCode":"3056"  , "StopFlag":"795214"  , "FromLoadSheet":"Rep Route"  , "Fsm":0  , "CustomerDuration":644.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 6:36:00 PM"  , "OldStartTime":"3/2/2018 6:36:00 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                     {
//                       "StartTime":"7:00 AM",
//                       "EndTime":"5:00 PM",
//                       "Mon":"False",
//                       "Tus":"True",
//                       "Wen":"True",
//                       "Thu":"True",
//                       "Fri":"True",
//                       "Sat":"False",
//                       "Sun":"False",
//                       "ServiceWindowID":"3652"
//                     }
//                   ]
//                     , "Latitude":"-37.7986042"  , "Longitude":"144.9685933"  , "Kegs":0  , "Cases":2  , "Weight":16  , "OldLoadSheetID":"12448"  , "Deleted":"false"  , "Sequence":1  , "OldSequence":1  , "Invoices":["795214"] }
//                   ,{
//                   "StopID":"362876"  , "CustomerID":"7427"  , "EventID":"362876"  , "NumUnitsStr":"0^0^0^" , "LoadSheetPhase":"3"  , "UserName":"SMARTARTZGAL"  , "Date":"3/2/2018"  , "Company":"SMART ARTZ GALLERY"  , "Address":"2 ALFRED PLACE"  , "Address2":""  , "City":"SOUTH MELBOURNE"  , "State":"VIC"  , "PostalCode":"3205"  , "StopFlag":"790832"  , "FromLoadSheet":"Rep Route"  , "Fsm":0  , "CustomerDuration":776.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 7:07:44 PM"  , "OldStartTime":"3/2/2018 7:07:44 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                   ]
//                   , "Latitude":"-37.8314108"  , "Longitude":"144.9592778"  , "Kegs":0  , "Cases":0  , "Weight":0  , "OldLoadSheetID":"12448"  , "Deleted":"false"  , "Sequence":2  , "OldSequence":2  , "Invoices":["790832"] }
//                 ]}
//             ,{
//             "LoadSheetID":"12382",
//             "Status":"3",
//             "PlanID":"6746",
//             "CostPerMile":"",
//             "PlanDate":"3/2/2018",
//             "PickUnits":"PKG^KEG^Total",
//             "StartTime":"6:00 AM",
//             "EndTime":"0",
//             "Duration":0,
//             "OldServiceTime":0.00,
//             "OldDistance":0.000000,
//             "LoadSheetNum":"12382",
//             "Employee":"pault",
//             "Route":"1 CBD ZONE 1 (PAUL) FRIDAY",
//             "RouteID":"68",
//             "RouteNum":"1",
//             "LSDate":"3/2/2018",
//             "Address":"54 Hunter Road",
//             "Address2":"Derrimut",
//             "City":"Melbourne",
//             "State":"VIC",
//             "PostalCode":"3030",
//             "Helper":"False",
//             "MaxCargoWeight":"4500",
//             "PalletCount":"37",
//             "StartMapPointID":"1",
//             "EndMapPointID":"1",
//             "Color":"0000FF",
//             "LocationID":"1",
//             "Company":"",
//             "Stops":
//               [
//                 {
//                   "StopID":"385508"  , "CustomerID":"5795"  , "EventID":"385508"  , "NumUnitsStr":"0^1^1^" , "LoadSheetPhase":"3"  , "UserName":"LITTLERAMENB"  , "Date":"3/2/2018"  , "Company":"LITTLE RAMEN BAR"  , "Address":"5\/346 LITTLE BOURKE ST"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794591"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":622.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 6:33:00 AM"  , "OldStartTime":"3/2/2018 6:33:00 AM"  , "CanMove":"0"  , "InvoiceLocked":"1"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                   , "Latitude":"-37.813121"  , "Longitude":"144.96236699999997"  , "Kegs":1  , "Cases":0  , "Weight":60  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":1  , "OldSequence":1  , "Invoices":["794591"] }
//                 ,{
//                 "StopID":"385507"  , "CustomerID":"4871"  , "EventID":"385507"  , "NumUnitsStr":"8^0^8^" , "LoadSheetPhase":"3"  , "UserName":"GRILLDLITTLE"  , "Date":"3/2/2018"  , "Company":"GRILL\u0027D LITTLE BOURKE ST"  , "Address":"369-371 LITTLE BOURKE ST"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794599"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":798.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 6:44:22 AM"  , "OldStartTime":"3/2/2018 6:44:22 AM"  , "CanMove":"0"  , "InvoiceLocked":"1"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8136713"  , "Longitude":"144.96177360000001"  , "Kegs":0  , "Cases":8  , "Weight":91  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":2  , "OldSequence":2  , "Invoices":["795060","794599"] }
//                 ,{
//                 "StopID":"385165"  , "CustomerID":"100497"  , "EventID":"385165"  , "NumUnitsStr":"4^0^4^" , "LoadSheetPhase":"3"  , "UserName":"PALERMO"  , "Date":"3/2/2018"  , "Company":"PALERMO"  , "Address":"401 LITTLE BOURKE ST"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794220"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":689.7600000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 6:58:40 AM"  , "OldStartTime":"3/2/2018 6:58:40 AM"  , "CanMove":"0"  , "InvoiceLocked":"1"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.813901"  , "Longitude":"144.960994"  , "Kegs":0  , "Cases":4  , "Weight":45  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":3  , "OldSequence":3  , "Invoices":["794220"] }
//                 ,{
//                 "StopID":"388572"  , "CustomerID":"7031"  , "EventID":"388572"  , "NumUnitsStr":"22^0^22^" , "LoadSheetPhase":"3"  , "UserName":"MOVIDAAQUI"  , "Date":"3/2/2018"  , "Company":"MOVIDA AQUI"  , "Address":"500 BOURKE ST"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794874"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":1084.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 7:13:10 AM"  , "OldStartTime":"3/2/2018 7:13:10 AM"  , "CanMove":"0"  , "InvoiceLocked":"1"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8151371"  , "Longitude":"144.95878960000005"  , "Kegs":0  , "Cases":22  , "Weight":384  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":4  , "OldSequence":4  , "Invoices":["794874"] }
//                 ,{
//                 "StopID":"385509"  , "CustomerID":"8198"  , "EventID":"385509"  , "NumUnitsStr":"3^0^3^" , "LoadSheetPhase":"3"  , "UserName":"QTMELBOURNE"  , "Date":"3/2/2018"  , "Company":"QT MELBOURNE"  , "Address":"133 RUSSELL STREET"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794546"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":696.1200000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 7:41:14 AM"  , "OldStartTime":"3/2/2018 7:41:14 AM"  , "CanMove":"0"  , "InvoiceLocked":"1"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8133721"  , "Longitude":"144.96798420000005"  , "Kegs":0  , "Cases":3  , "Weight":26  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":5  , "OldSequence":5  , "Invoices":["794546"] }
//                 ,{
//                 "StopID":"385033"  , "CustomerID":"7007"  , "EventID":"385033"  , "NumUnitsStr":"15^0^15^" , "LoadSheetPhase":"3"  , "UserName":"STALACTITESR"  , "Date":"3/2/2018"  , "Company":"STALACTITES RESTAURANT"  , "Address":"177-183 LONSDALE ST"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794085"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":930.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 7:54:50 AM"  , "OldStartTime":"3/2/2018 7:54:50 AM"  , "CanMove":"1"  , "InvoiceLocked":"1"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.81117649999999"  , "Longitude":"144.96706740000002"  , "Kegs":0  , "Cases":15  , "Weight":118  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":6  , "OldSequence":6  , "Invoices":["794085"] }
//                 ,{
//                 "StopID":"385622"  , "CustomerID":"4905"  , "EventID":"385622"  , "NumUnitsStr":"26^0^26^" , "LoadSheetPhase":"3"  , "UserName":"MELBOURNEMAR"  , "Date":"3/2/2018"  , "Company":"MELBOURNE MARRIOTT HOTEL"  , "Address":"LONSDALE & EXHIBITION ST"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794666"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":1536.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 8:12:20 AM"  , "OldStartTime":"3/2/2018 8:12:20 AM"  , "CanMove":"0"  , "InvoiceLocked":"1"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8100929"  , "Longitude":"144.9695769"  , "Kegs":0  , "Cases":26  , "Weight":317  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":7  , "OldSequence":7  , "Invoices":["794669","794666"] }
//                 ,{
//                 "StopID":"385126"  , "CustomerID":"459"  , "EventID":"385126"  , "NumUnitsStr":"32^0^32^" , "LoadSheetPhase":"3"  , "UserName":"GROSSIFLOREN"  , "Date":"3/2/2018"  , "Company":"GROSSI FLORENTINO"  , "Address":"80 BOURKE STREET"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794141"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":1307.5200000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 8:38:56 AM"  , "OldStartTime":"3/2/2018 8:38:56 AM"  , "CanMove":"1"  , "InvoiceLocked":"1"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8117825"  , "Longitude":"144.9708561"  , "Kegs":0  , "Cases":32  , "Weight":525  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":8  , "OldSequence":8  , "Invoices":["794286","794141"] }
//                 ,{
//                 "StopID":"385506"  , "CustomerID":"3573"  , "EventID":"385506"  , "NumUnitsStr":"6^0^6^" , "LoadSheetPhase":"3"  , "UserName":"BOTTEGARESTA"  , "Date":"3/2/2018"  , "Company":"BOTTEGA RESTAURANT"  , "Address":"74 BOURKE ST"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794409"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":732.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 9:05:44 AM"  , "OldStartTime":"3/2/2018 9:05:44 AM"  , "CanMove":"1"  , "InvoiceLocked":"1"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.81174"  , "Longitude":"144.97102700000005"  , "Kegs":0  , "Cases":6  , "Weight":79  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":9  , "OldSequence":9  , "Invoices":["794409"] }
//                 ,{
//                 "StopID":"385626"  , "CustomerID":"1488"  , "EventID":"385626"  , "NumUnitsStr":"10^0^10^" , "LoadSheetPhase":"3"  , "UserName":"SPAGHETTITRE"  , "Date":"3/2/2018"  , "Company":"SPAGHETTI TREE RESTAURANT"  , "Address":"59 BOURKE STREET"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794712"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":820.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 9:18:56 AM"  , "OldStartTime":"3/2/2018 9:18:56 AM"  , "CanMove":"1"  , "InvoiceLocked":"1"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8120197"  , "Longitude":"144.97151789999998"  , "Kegs":0  , "Cases":10  , "Weight":78  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":10  , "OldSequence":10  , "Invoices":["794712"] }
//                 ,{
//                 "StopID":"385031"  , "CustomerID":"7460"  , "EventID":"385031"  , "NumUnitsStr":"14^0^14^" , "LoadSheetPhase":"3"  , "UserName":"HOCHIMAMA"  , "Date":"3/2/2018"  , "Company":"HOCHI MAMA"  , "Address":"11-15 LIVERPOOL ST"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794107"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":911.7400000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 9:33:36 AM"  , "OldStartTime":"3/2/2018 9:33:36 AM"  , "CanMove":"1"  , "InvoiceLocked":"1"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.811311"  , "Longitude":"144.97132310000006"  , "Kegs":0  , "Cases":14  , "Weight":160  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":11  , "OldSequence":11  , "Invoices":["794836","794830","794107"] }
//                 ,{
//                 "StopID":"385131"  , "CustomerID":"9055"  , "EventID":"385131"  , "NumUnitsStr":"1^0^1^" , "LoadSheetPhase":"3"  , "UserName":"IMPERIALHO_3"  , "Date":"3/2/2018"  , "Company":"IMPERIAL HOTEL, BOURKE ST"  , "Address":"2-8 BOURKE ST"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794310"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":614.7400000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 9:52:48 AM"  , "OldStartTime":"3/2/2018 9:52:48 AM"  , "CanMove":"1"  , "InvoiceLocked":"1"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8112554"  , "Longitude":"144.97268800000006"  , "Kegs":0  , "Cases":1  , "Weight":3  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":12  , "OldSequence":12  , "Invoices":["794310"] }
//                 ,{
//                 "StopID":"388570"  , "CustomerID":"2078"  , "EventID":"388570"  , "NumUnitsStr":"25^4^29^" , "LoadSheetPhase":"3"  , "UserName":"LONGGRAINMEL"  , "Date":"3/2/2018"  , "Company":"LONGGRAIN MELBOURNE"  , "Address":"44 LITTLE BOURKE STREET"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794936"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":1241.7400000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 10:05:03 AM"  , "OldStartTime":"3/2/2018 10:05:03 AM"  , "CanMove":"1"  , "InvoiceLocked":"1"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8106475"  , "Longitude":"144.97120960000007"  , "Kegs":4  , "Cases":25  , "Weight":510  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":13  , "OldSequence":13  , "Invoices":["795068","794936"] }
//                 ,{
//                 "StopID":"385512"  , "CustomerID":"100499"  , "EventID":"385512"  , "NumUnitsStr":"0^0^0^" , "LoadSheetPhase":"3"  , "UserName":"TAKUMIJAPAN"  , "Date":"3/2/2018"  , "Company":"TAKUMI JAPANESE RESTAURANT"  , "Address":"SHOP 2, 32 BOURKE ST"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794376"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":601.7600000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 10:27:45 AM"  , "OldStartTime":"3/2/2018 10:27:45 AM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.811442"  , "Longitude":"144.9720127"  , "Kegs":0  , "Cases":0  , "Weight":1  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":14  , "OldSequence":14  , "Invoices":["794376"] }
//                 ,{
//                 "StopID":"386077"  , "CustomerID":"4318"  , "EventID":"386077"  , "NumUnitsStr":"15^0^15^" , "LoadSheetPhase":"3"  , "UserName":"SANTELMO"  , "Date":"3/2/2018"  , "Company":"SAN TELMO"  , "Address":"14 MEYERS PLACE"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794749"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":930.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 10:37:47 AM"  , "OldStartTime":"3/2/2018 10:37:47 AM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                   {
//                     "StartTime":"9:00 AM",
//                     "EndTime":"12:00 PM",
//                     "Mon":"True",
//                     "Tus":"True",
//                     "Wen":"True",
//                     "Thu":"True",
//                     "Fri":"True",
//                     "Sat":"False",
//                     "Sun":"False",
//                     "ServiceWindowID":"3596"
//                   }
//                 ]
//                 , "Latitude":"-37.8122413"  , "Longitude":"144.9723851"  , "Kegs":0  , "Cases":15  , "Weight":205  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":15  , "OldSequence":15  , "Invoices":["794749"] }
//                 ,{
//                 "StopID":"385029"  , "CustomerID":"2180"  , "EventID":"385029"  , "NumUnitsStr":"6^0^6^" , "LoadSheetPhase":"3"  , "UserName":"BARLOURINHA"  , "Date":"3/2/2018"  , "Company":"BAR LOURINHA"  , "Address":"37 LITTLE COLLINS ST"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794294"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":741.2400000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 10:53:17 AM"  , "OldStartTime":"3/2/2018 10:53:17 AM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.812765"  , "Longitude":"144.97247600000003"  , "Kegs":0  , "Cases":6  , "Weight":81  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":16  , "OldSequence":16  , "Invoices":["794294"] }
//                 ,{
//                 "StopID":"388574"  , "CustomerID":"5597"  , "EventID":"388574"  , "NumUnitsStr":"20^0^20^" , "LoadSheetPhase":"3"  , "UserName":"SHERATONMELB"  , "Date":"3/2/2018"  , "Company":"SHERATON MELBOURNE"  , "Address":"27 LITTLE COLLINS ST"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794930"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":1320.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 11:09:38 AM"  , "OldStartTime":"3/2/2018 11:09:38 AM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8127232"  , "Longitude":"144.97262509999996"  , "Kegs":0  , "Cases":20  , "Weight":266  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":17  , "OldSequence":17  , "Invoices":["794934","794931","794930"] }
//                 ,{
//                 "StopID":"385627"  , "CustomerID":"2736"  , "EventID":"385627"  , "NumUnitsStr":"6^0^6^" , "LoadSheetPhase":"3"  , "UserName":"STAMFORDPLAZ"  , "Date":"3/2/2018"  , "Company":"STAMFORD PLAZA MELBOURNE"  , "Address":"111 LITTLE COLLINS STREET"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794735"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":816.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 11:33:38 AM"  , "OldStartTime":"3/2/2018 11:33:38 AM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8134858"  , "Longitude":"144.96999879999998"  , "Kegs":0  , "Cases":6  , "Weight":82  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":18  , "OldSequence":18  , "Invoices":["794735"] }
//                 ,{
//                 "StopID":"385035"  , "CustomerID":"100434"  , "EventID":"385035"  , "NumUnitsStr":"11^0^11^" , "LoadSheetPhase":"3"  , "UserName":"YOKOCHOPTY"  , "Date":"3/2/2018"  , "Company":"YOKOCHO PTY LTD"  , "Address":"101, 200 BOURKE ST"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794155"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":849.2600000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 11:50:14 AM"  , "OldStartTime":"3/2/2018 11:50:14 AM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8124355"  , "Longitude":"144.9672698"  , "Kegs":0  , "Cases":11  , "Weight":107  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":19  , "OldSequence":19  , "Invoices":["794155"] }
//                 ,{
//                 "StopID":"385118"  , "CustomerID":"2008"  , "EventID":"385118"  , "NumUnitsStr":"1^0^1^" , "LoadSheetPhase":"3"  , "UserName":"CARLTONHOTEL"  , "Date":"3/2/2018"  , "Company":"CARLTON HOTEL"  , "Address":"193 BOURKE ST"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794160"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":618.2600000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 12:14:23 PM"  , "OldStartTime":"3/2/2018 12:14:23 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8131779"  , "Longitude":"144.96763729999998"  , "Kegs":0  , "Cases":1  , "Weight":8  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":20  , "OldSequence":20  , "Invoices":["794160"] }
//                 ,{
//                 "StopID":"385142"  , "CustomerID":"9137"  , "EventID":"385142"  , "NumUnitsStr":"3^0^3^" , "LoadSheetPhase":"3"  , "UserName":"MUSASHIRAMEN"  , "Date":"3/2/2018"  , "Company":"MUSASHI RAMEN"  , "Address":"181 RUSSELL ST"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794260"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":666.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 12:27:41 PM"  , "OldStartTime":"3/2/2018 12:27:41 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.81200159999999"  , "Longitude":"144.9677878"  , "Kegs":0  , "Cases":3  , "Weight":36  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":21  , "OldSequence":21  , "Invoices":["794260"] }
//                 ,{
//                 "StopID":"386153"  , "CustomerID":"4407"  , "EventID":"386153"  , "NumUnitsStr":"12^0^12^" , "LoadSheetPhase":"3"  , "UserName":"FLOWERDRUMRE"  , "Date":"3/2/2018"  , "Company":"FLOWER DRUM RESTAURANT"  , "Address":"17 MARKET LANE"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794835"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":864.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 12:40:47 PM"  , "OldStartTime":"3/2/2018 12:40:47 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8118976"  , "Longitude":"144.96921999999995"  , "Kegs":0  , "Cases":12  , "Weight":123  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":22  , "OldSequence":22  , "Invoices":["794835"] }
//                 ,{
//                 "StopID":"383270"  , "CustomerID":"100464"  , "EventID":"383270"  , "NumUnitsStr":"2^0^2^" , "LoadSheetPhase":"3"  , "UserName":"GINZATEPPAN"  , "Date":"3/2/2018"  , "Company":"GINZA TEPPANYAKI JAPANESE CUISINE"  , "Address":"139 LITTLE BOURKE ST"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"792968"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":644.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 12:56:11 PM"  , "OldStartTime":"3/2/2018 12:56:11 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8124467"  , "Longitude":"144.9686115"  , "Kegs":0  , "Cases":2  , "Weight":15  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":23  , "OldSequence":23  , "Invoices":["792968"] }
//                 ,{
//                 "StopID":"385034"  , "CustomerID":"7230"  , "EventID":"385034"  , "NumUnitsStr":"2^0^2^" , "LoadSheetPhase":"3"  , "UserName":"THECRANEREST"  , "Date":"3/2/2018"  , "Company":"THE CRANE RESTAURANT"  , "Address":"212 LITTLE BOURKE ST"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794238"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":644.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 1:08:55 PM"  , "OldStartTime":"3/2/2018 1:08:55 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8121"  , "Longitude":"144.966315"  , "Kegs":0  , "Cases":2  , "Weight":15  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":24  , "OldSequence":24  , "Invoices":["794238"] }
//                 ,{
//                 "StopID":"385028"  , "CustomerID":"8447"  , "EventID":"385028"  , "NumUnitsStr":"2^0^2^" , "LoadSheetPhase":"3"  , "UserName":"22WHITEHART"  , "Date":"3/2/2018"  , "Company":"22 WHITEHART"  , "Address":"22 WHITEHART LANE"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794122"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":636.5200000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 1:23:39 PM"  , "OldStartTime":"3/2/2018 1:23:39 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.812872"  , "Longitude":"144.96193300000004"  , "Kegs":0  , "Cases":2  , "Weight":15  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":25  , "OldSequence":25  , "Invoices":["794282","794122"] }
//                 ,{
//                 "StopID":"385534"  , "CustomerID":"993"  , "EventID":"385534"  , "NumUnitsStr":"2^0^2^" , "LoadSheetPhase":"3"  , "UserName":"THEWIGSCELLA"  , "Date":"3/2/2018"  , "Company":"THE WIGS CELLAR"  , "Address":"172 QUEEN STREET"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794644"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":644.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 1:36:16 PM"  , "OldStartTime":"3/2/2018 1:36:16 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8144586"  , "Longitude":"144.96076019999998"  , "Kegs":0  , "Cases":2  , "Weight":17  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":26  , "OldSequence":26  , "Invoices":["794644"] }
//                 ,{
//                 "StopID":"385511"  , "CustomerID":"749"  , "EventID":"385511"  , "NumUnitsStr":"0^6^6^" , "LoadSheetPhase":"3"  , "UserName":"TOWNHALLHOTE"  , "Date":"3/2/2018"  , "Company":"TOWN HALL HOTEL NTH MELB"  , "Address":"33 ERROL STREET"  , "Address2":""  , "City":"NORTH MELBOURNE"  , "State":"VIC"  , "PostalCode":"3051"  , "StopFlag":"794503"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":732.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 1:55:00 PM"  , "OldStartTime":"3/2/2018 1:55:00 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8042351"  , "Longitude":"144.94941429999994"  , "Kegs":6  , "Cases":0  , "Weight":370  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":27  , "OldSequence":27  , "Invoices":["794503"] }
//                 ,{
//                 "StopID":"385159"  , "CustomerID":"5413"  , "EventID":"385159"  , "NumUnitsStr":"6^0^6^" , "LoadSheetPhase":"3"  , "UserName":"THEHOTPOPPY"  , "Date":"3/2/2018"  , "Company":"THE HOT POPPY"  , "Address":"9 ERROL ST"  , "Address2":""  , "City":"NORTH MELBOURNE"  , "State":"VIC"  , "PostalCode":"3051"  , "StopFlag":"794231"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":730.2400000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 2:07:12 PM"  , "OldStartTime":"3/2/2018 2:07:12 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.804762"  , "Longitude":"144.94904700000006"  , "Kegs":0  , "Cases":6  , "Weight":60  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":28  , "OldSequence":28  , "Invoices":["794923","794231"] }
//                 ,{
//                 "StopID":"388756"  , "CustomerID":"5000"  , "EventID":"388756"  , "NumUnitsStr":"7^0^7^" , "LoadSheetPhase":"3"  , "UserName":"CITICLUBONQU"  , "Date":"3/2/2018"  , "Company":"CITI CLUB ON QUEEN"  , "Address":"113 QUEEN ST"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"795052"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":754.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 2:27:22 PM"  , "OldStartTime":"3/2/2018 2:27:22 PM"  , "CanMove":"1"  , "InvoiceLocked":"1"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8157528"  , "Longitude":"144.9607103"  , "Kegs":0  , "Cases":7  , "Weight":91  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":29  , "OldSequence":29  , "Invoices":["795052"] }
//                 ,{
//                 "StopID":"388746"  , "CustomerID":"6559"  , "EventID":"388746"  , "NumUnitsStr":"12^0^12^" , "LoadSheetPhase":"3"  , "UserName":"CAPTAINMELVI"  , "Date":"3/2/2018"  , "Company":"CAPTAIN MELVILLE"  , "Address":"34 FRANKLIN ST"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794972"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":867.7400000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 2:44:56 PM"  , "OldStartTime":"3/2/2018 2:44:56 PM"  , "CanMove":"1"  , "InvoiceLocked":"1"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8075851"  , "Longitude":"144.9616416"  , "Kegs":0  , "Cases":12  , "Weight":104  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":30  , "OldSequence":30  , "Invoices":["794972"] }
//                 ,{
//                 "StopID":"388735"  , "CustomerID":"5875"  , "EventID":"388735"  , "NumUnitsStr":"5^1^6^" , "LoadSheetPhase":"3"  , "UserName":"MEATMAIDEN"  , "Date":"3/2/2018"  , "Company":"MEATMAIDEN"  , "Address":"195 LITTLE COLLINS ST"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"794955"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":724.7400000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 3:07:24 PM"  , "OldStartTime":"3/2/2018 3:07:24 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8144873"  , "Longitude":"144.96787410000002"  , "Kegs":1  , "Cases":5  , "Weight":103  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":31  , "OldSequence":31  , "Invoices":["794955"] }
//                 ,{
//                 "StopID":"388748"  , "CustomerID":"7339"  , "EventID":"388748"  , "NumUnitsStr":"0^2^2^" , "LoadSheetPhase":"3"  , "UserName":"ELRINCON"  , "Date":"3/2/2018"  , "Company":"EL RINCON"  , "Address":"69 VICTORIA ST"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"795038"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":644.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 3:27:29 PM"  , "OldStartTime":"3/2/2018 3:27:29 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8064069"  , "Longitude":"144.95884060000003"  , "Kegs":2  , "Cases":0  , "Weight":124  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":32  , "OldSequence":32  , "Invoices":["795038"] }
//                 ,{
//                 "StopID":"389036"  , "CustomerID":"3140"  , "EventID":"389036"  , "NumUnitsStr":"11^0^11^" , "LoadSheetPhase":"3"  , "UserName":"PUNCHLANEWIN"  , "Date":"3/2/2018"  , "Company":"PUNCH LANE WINE BAR RESTAURANT"  , "Address":"43 LT BOURKE ST"  , "Address2":""  , "City":"MELBOURNE"  , "State":"VIC"  , "PostalCode":"3000"  , "StopFlag":"795174"  , "FromLoadSheet":"1 CBD ZONE 1 (PAUL) FRIDAY"  , "Fsm":0  , "CustomerDuration":849.2600000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 3:46:13 PM"  , "OldStartTime":"3/2/2018 3:46:13 PM"  , "CanMove":"1"  , "InvoiceLocked":"1"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.81088"  , "Longitude":"144.97133499999995"  , "Kegs":0  , "Cases":11  , "Weight":136  , "OldLoadSheetID":"12382"  , "Deleted":"false"  , "Sequence":33  , "OldSequence":33  , "Invoices":["795174"] }
//               ]}
//             ,{
//             "LoadSheetID":"12385",
//             "Status":"3",
//             "PlanID":"6756",
//             "CostPerMile":"",
//             "PlanDate":"3/2/2018",
//             "PickUnits":"PKG^KEG^Total",
//             "StartTime":"6:00 AM",
//             "EndTime":"0",
//             "Duration":0,
//             "OldServiceTime":0.00,
//             "OldDistance":0.000000,
//             "LoadSheetNum":"12385",
//             "Employee":"matt",
//             "Route":"8 WEST (FOOTSCRAY) FRIDAY",
//             "RouteID":"242",
//             "RouteNum":"8",
//             "LSDate":"3/2/2018",
//             "Address":"54 Hunter Road",
//             "Address2":"Derrimut",
//             "City":"Melbourne",
//             "State":"VIC",
//             "PostalCode":"3030",
//             "Helper":"False",
//             "MaxCargoWeight":"5000",
//             "PalletCount":"38",
//             "StartMapPointID":"1",
//             "EndMapPointID":"1",
//             "Color":"8B5F65",
//             "LocationID":"1",
//             "Company":"",
//             "Stops":
//               [
//                 {
//                   "StopID":"385536"  , "CustomerID":"9651"  , "EventID":"385536"  , "NumUnitsStr":"2^0^2^" , "LoadSheetPhase":"3"  , "UserName":"Crown_Nobu"  , "Date":"3/2/2018"  , "Company":"Crown_Nobu"  , "Address":"56-58 VELLA DRIVE"  , "Address2":""  , "City":"WEST SUNSHINE"  , "State":"VIC"  , "PostalCode":"3012"  , "StopFlag":"794370"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":644.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 6:15:00 AM"  , "OldStartTime":"3/2/2018 6:15:00 AM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                   , "Latitude":"-37.804801"  , "Longitude":"144.82772939999995"  , "Kegs":0  , "Cases":2  , "Weight":14  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":1  , "OldSequence":1  , "Invoices":["794370"] }
//                 ,{
//                 "StopID":"385529"  , "CustomerID":"9641"  , "EventID":"385529"  , "NumUnitsStr":"2^0^2^" , "LoadSheetPhase":"3"  , "UserName":"Crown_LongCh"  , "Date":"3/2/2018"  , "Company":"Crown_Long Chim"  , "Address":"56-58 VELLA DRIVE"  , "Address2":""  , "City":"WEST SUNSHINE"  , "State":"VIC"  , "PostalCode":"3012"  , "StopFlag":"794371"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":636.7400000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 6:25:44 AM"  , "OldStartTime":"3/2/2018 6:25:44 AM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.804801"  , "Longitude":"144.82772939999995"  , "Kegs":0  , "Cases":2  , "Weight":14  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":2  , "OldSequence":2  , "Invoices":["794627","794371"] }
//                 ,{
//                 "StopID":"385568"  , "CustomerID":"9657"  , "EventID":"385568"  , "NumUnitsStr":"0^0^0^" , "LoadSheetPhase":"3"  , "UserName":"Crown_TheWai"  , "Date":"3/2/2018"  , "Company":"Crown_The Waiting Room"  , "Address":"56-58 VELLA DRIVE"  , "Address2":""  , "City":"WEST SUNSHINE"  , "State":"VIC"  , "PostalCode":"3012"  , "StopFlag":"794663"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":603.7400000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 6:36:21 AM"  , "OldStartTime":"3/2/2018 6:36:21 AM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.804801"  , "Longitude":"144.82772939999995"  , "Kegs":0  , "Cases":0  , "Weight":2  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":3  , "OldSequence":3  , "Invoices":["794663"] }
//                 ,{
//                 "StopID":"385535"  , "CustomerID":"9706"  , "EventID":"385535"  , "NumUnitsStr":"2^0^2^" , "LoadSheetPhase":"3"  , "UserName":"Crown_Dinner"  , "Date":"3/2/2018"  , "Company":"Crown_Dinner bar"  , "Address":"56-58 VELLA DRIVE"  , "Address2":""  , "City":"WEST SUNSHINE"  , "State":"VIC"  , "PostalCode":"3012"  , "StopFlag":"794369"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":651.2600000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 6:46:25 AM"  , "OldStartTime":"3/2/2018 6:46:25 AM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.804801"  , "Longitude":"144.8277294"  , "Kegs":0  , "Cases":2  , "Weight":35  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":4  , "OldSequence":4  , "Invoices":["794369"] }
//                 ,{
//                 "StopID":"386010"  , "CustomerID":"7801"  , "EventID":"386010"  , "NumUnitsStr":"6^1^7^" , "LoadSheetPhase":"3"  , "UserName":"SUNSHINEYCWS"  , "Date":"3/2/2018"  , "Company":"SUNSHINE YCW SPORTS CLUB"  , "Address":"55 LILY STREET"  , "Address2":""  , "City":"BRAYBROOK"  , "State":"VIC"  , "PostalCode":"3019"  , "StopFlag":"794766"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":754.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 7:09:16 AM"  , "OldStartTime":"3/2/2018 7:09:16 AM"  , "CanMove":"1"  , "InvoiceLocked":"1"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.7834395"  , "Longitude":"144.8488099"  , "Kegs":1  , "Cases":6  , "Weight":126  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":5  , "OldSequence":5  , "Invoices":["794766"] }
//                 ,{
//                 "StopID":"385094"  , "CustomerID":"6684"  , "EventID":"385094"  , "NumUnitsStr":"12^0^12^" , "LoadSheetPhase":"3"  , "UserName":"FOOTSCRAYPAR"  , "Date":"3/2/2018"  , "Company":"FOOTSCRAY PARK BOWLING CLUB"  , "Address":"1 HOADLEY CRT"  , "Address2":""  , "City":"FOOTSCRAY"  , "State":"VIC"  , "PostalCode":"3011"  , "StopFlag":"794201"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":864.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 7:32:50 AM"  , "OldStartTime":"3/2/2018 7:32:50 AM"  , "CanMove":"1"  , "InvoiceLocked":"1"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.7924199"  , "Longitude":"144.89811669999995"  , "Kegs":0  , "Cases":12  , "Weight":135  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":6  , "OldSequence":6  , "Invoices":["794201"] }
//                 ,{
//                 "StopID":"385550"  , "CustomerID":"6153"  , "EventID":"385550"  , "NumUnitsStr":"63^0^63^" , "LoadSheetPhase":"3"  , "UserName":"CLUBLEEDS"  , "Date":"3/2/2018"  , "Company":"CLUB LEEDS"  , "Address":"17 LEEDS ST"  , "Address2":""  , "City":"FOOTSCRAY"  , "State":"VIC"  , "PostalCode":"3011"  , "StopFlag":"794589"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":1989.7400000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 7:53:14 AM"  , "OldStartTime":"3/2/2018 7:53:14 AM"  , "CanMove":"1"  , "InvoiceLocked":"1"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.7997389"  , "Longitude":"144.9011458"  , "Kegs":0  , "Cases":63  , "Weight":846  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":7  , "OldSequence":7  , "Invoices":["794589"] }
//                 ,{
//                 "StopID":"385537"  , "CustomerID":"3943"  , "EventID":"385537"  , "NumUnitsStr":"6^0^6^" , "LoadSheetPhase":"3"  , "UserName":"GRILLDHIGHPO"  , "Date":"3/2/2018"  , "Company":"GRILL\u0027D HIGHPOINT"  , "Address":"1107 HIGHPOINT CEN"  , "Address2":""  , "City":"MARIBYRNONG"  , "State":"VIC"  , "PostalCode":"3032"  , "StopFlag":"794549"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":732.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 8:40:24 AM"  , "OldStartTime":"3/2/2018 8:40:24 AM"  , "CanMove":"1"  , "InvoiceLocked":"1"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.7736856"  , "Longitude":"144.88878569999997"  , "Kegs":0  , "Cases":6  , "Weight":85  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":8  , "OldSequence":8  , "Invoices":["794549"] }
//                 ,{
//                 "StopID":"385629"  , "CustomerID":"2146"  , "EventID":"385629"  , "NumUnitsStr":"9^0^9^" , "LoadSheetPhase":"3"  , "UserName":"MANGOLOUNGE"  , "Date":"3/2/2018"  , "Company":"MANGO LOUNGE"  , "Address":"17 HALL STREET"  , "Address2":""  , "City":"MOONEE PONDS"  , "State":"VIC"  , "PostalCode":"3039"  , "StopFlag":"794738"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":807.2400000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 9:06:36 AM"  , "OldStartTime":"3/2/2018 9:06:36 AM"  , "CanMove":"1"  , "InvoiceLocked":"1"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.766331"  , "Longitude":"144.92306899999994"  , "Kegs":0  , "Cases":9  , "Weight":111  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":9  , "OldSequence":9  , "Invoices":["794738"] }
//                 ,{
//                 "StopID":"388799"  , "CustomerID":"6769"  , "EventID":"388799"  , "NumUnitsStr":"3^0^3^" , "LoadSheetPhase":"3"  , "UserName":"PENNYYOUNG"  , "Date":"3/2/2018"  , "Company":"PENNY YOUNG"  , "Address":"22 YOUNG ST"  , "Address2":""  , "City":"MOONEE PONDS"  , "State":"VIC"  , "PostalCode":"3039"  , "StopFlag":"795079"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":666.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 9:26:03 AM"  , "OldStartTime":"3/2/2018 9:26:03 AM"  , "CanMove":"1"  , "InvoiceLocked":"1"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.767846"  , "Longitude":"144.92310599999996"  , "Kegs":0  , "Cases":3  , "Weight":29  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":10  , "OldSequence":10  , "Invoices":["795079"] }
//                 ,{
//                 "StopID":"387514"  , "CustomerID":"5752"  , "EventID":"387514"  , "NumUnitsStr":"1^0^1^" , "LoadSheetPhase":"3"  , "UserName":"KENTSTREETLI"  , "Date":"3/2/2018"  , "Company":"KENT STREET LIQUOR"  , "Address":"1 KENT ST"  , "Address2":""  , "City":"ASCOT VALE"  , "State":"VIC"  , "PostalCode":"3032"  , "StopFlag":"794873"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":622.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 9:43:09 AM"  , "OldStartTime":"3/2/2018 9:43:09 AM"  , "CanMove":"1"  , "InvoiceLocked":"1"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.781061"  , "Longitude":"144.93203500000004"  , "Kegs":0  , "Cases":1  , "Weight":16  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":11  , "OldSequence":11  , "Invoices":["794873"] }
//                 ,{
//                 "StopID":"385096"  , "CustomerID":"7968"  , "EventID":"385096"  , "NumUnitsStr":"1^0^1^" , "LoadSheetPhase":"3"  , "UserName":"SUGASKULLS"  , "Date":"3/2/2018"  , "Company":"SUGA SKULLS"  , "Address":"185 MT ALEXANDER ROAD"  , "Address2":""  , "City":"FLEMINGTON"  , "State":"VIC"  , "PostalCode":"3031"  , "StopFlag":"794158"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":618.2600000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 9:53:31 AM"  , "OldStartTime":"3/2/2018 9:53:31 AM"  , "CanMove":"1"  , "InvoiceLocked":"1"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.781027"  , "Longitude":"144.93214999999998"  , "Kegs":0  , "Cases":1  , "Weight":7  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":12  , "OldSequence":12  , "Invoices":["794158"] }
//                 ,{
//                 "StopID":"388800"  , "CustomerID":"9554"  , "EventID":"388800"  , "NumUnitsStr":"78^0^78^" , "LoadSheetPhase":"3"  , "UserName":"UNIFOURCOR"  , "Date":"3/2/2018"  , "Company":"UNIFOUR CORPORATE FOODSERVICE"  , "Address":"1\/358 ARDEN ST"  , "Address2":""  , "City":"KENSINGTON"  , "State":"VIC"  , "PostalCode":"3031"  , "StopFlag":"794094"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":2319.7400000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 10:12:49 AM"  , "OldStartTime":"3/2/2018 10:12:49 AM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                   {
//                     "StartTime":"7:00 AM",
//                     "EndTime":"12:00 PM",
//                     "Mon":"False",
//                     "Tus":"True",
//                     "Wen":"True",
//                     "Thu":"True",
//                     "Fri":"True",
//                     "Sat":"False",
//                     "Sun":"False",
//                     "ServiceWindowID":"3692"
//                   }
//                 ]
//                 , "Latitude":"-37.7988886"  , "Longitude":"144.93374040000003"  , "Kegs":0  , "Cases":78  , "Weight":1109  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":13  , "OldSequence":13  , "Invoices":["794888","794094"] }
//                 ,{
//                 "StopID":"388927"  , "CustomerID":"4203"  , "EventID":"388927"  , "NumUnitsStr":"2^0^2^" , "LoadSheetPhase":"3"  , "UserName":"BARKLEYJOHNS"  , "Date":"3/2/2018"  , "Company":"BARKLEY JOHNSON"  , "Address":"11 ANDERSON ST"  , "Address2":""  , "City":"YARRAVILLE"  , "State":"VIC"  , "PostalCode":"3016"  , "StopFlag":"795099"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":649.5000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 11:03:29 AM"  , "OldStartTime":"3/2/2018 11:03:29 AM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8168876"  , "Longitude":"144.89179720000004"  , "Kegs":0  , "Cases":2  , "Weight":20  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":14  , "OldSequence":14  , "Invoices":["795099"] }
//                 ,{
//                 "StopID":"388911"  , "CustomerID":"8826"  , "EventID":"388911"  , "NumUnitsStr":"5^1^6^" , "LoadSheetPhase":"3"  , "UserName":"VAULTCAFEBAR"  , "Date":"3/2/2018"  , "Company":"VAULT CAFE BAR RESTAURANT"  , "Address":"13 BALLARAT ST"  , "Address2":""  , "City":"YARRAVILLE"  , "State":"VIC"  , "PostalCode":"3013"  , "StopFlag":"795087"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":726.5000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 11:15:19 AM"  , "OldStartTime":"3/2/2018 11:15:19 AM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8163176"  , "Longitude":"144.89110419999997"  , "Kegs":1  , "Cases":5  , "Weight":124  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":15  , "OldSequence":15  , "Invoices":["795087"] }
//                 ,{
//                 "StopID":"389007"  , "CustomerID":"5928"  , "EventID":"389007"  , "NumUnitsStr":"2^0^2^" , "LoadSheetPhase":"3"  , "UserName":"RAILWAYHOT_4"  , "Date":"3/2/2018"  , "Company":"RAILWAY HOTEL YARRAVILLE"  , "Address":"35 ANDERSON ST"  , "Address2":""  , "City":"YARRAVILLE"  , "State":"VIC"  , "PostalCode":"3013"  , "StopFlag":"795129"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":644.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 11:28:25 AM"  , "OldStartTime":"3/2/2018 11:28:25 AM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.816789"  , "Longitude":"144.89067699999998"  , "Kegs":0  , "Cases":2  , "Weight":44  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":16  , "OldSequence":16  , "Invoices":["795129"] }
//                 ,{
//                 "StopID":"385095"  , "CustomerID":"8331"  , "EventID":"385095"  , "NumUnitsStr":"2^0^2^" , "LoadSheetPhase":"3"  , "UserName":"HOBSONSBAYYA"  , "Date":"3/2/2018"  , "Company":"HOBSON\u0027S BAY YACHT CLUB"  , "Address":"270 NELSON PLACE"  , "Address2":""  , "City":"WILLIAMSTOWN"  , "State":"VIC"  , "PostalCode":"3016"  , "StopFlag":"794110"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":644.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 11:50:09 AM"  , "OldStartTime":"3/2/2018 11:50:09 AM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.859811"  , "Longitude":"144.90230599999995"  , "Kegs":0  , "Cases":2  , "Weight":16  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":17  , "OldSequence":17  , "Invoices":["794110"] }
//                 ,{
//                 "StopID":"385168"  , "CustomerID":"2937"  , "EventID":"385168"  , "NumUnitsStr":"4^0^4^" , "LoadSheetPhase":"3"  , "UserName":"WILLIAMSTOWN"  , "Date":"3/2/2018"  , "Company":"WILLIAMSTOWN FINE WINES"  , "Address":"9 FERGUSON STREET"  , "Address2":""  , "City":"WILLIAMSTOWN"  , "State":"VIC"  , "PostalCode":"3016"  , "StopFlag":"794216"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":681.4000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 12:01:53 PM"  , "OldStartTime":"3/2/2018 12:01:53 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.859538"  , "Longitude":"144.901121"  , "Kegs":0  , "Cases":4  , "Weight":45  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":18  , "OldSequence":18  , "Invoices":["794216"] }
//                 ,{
//                 "StopID":"385538"  , "CustomerID":"9604"  , "EventID":"385538"  , "NumUnitsStr":"1^0^1^" , "LoadSheetPhase":"3"  , "UserName":"STAGSHEADHOT"  , "Date":"3/2/2018"  , "Company":"STAG\u0027S HEAD HOTEL"  , "Address":"39 CECIL ST"  , "Address2":""  , "City":"WILLIAMSTOWN"  , "State":"VIC"  , "PostalCode":"3016"  , "StopFlag":"794464"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":622.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 12:17:14 PM"  , "OldStartTime":"3/2/2018 12:17:14 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.866189"  , "Longitude":"144.90650900000003"  , "Kegs":0  , "Cases":1  , "Weight":7  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":19  , "OldSequence":19  , "Invoices":["794464"] }
//                 ,{
//                 "StopID":"389038"  , "CustomerID":"3671"  , "EventID":"389038"  , "NumUnitsStr":"1^0^1^" , "LoadSheetPhase":"3"  , "UserName":"VICTORIAINN"  , "Date":"3/2/2018"  , "Company":"VICTORIA INN"  , "Address":"65-67 DOUGLAS PDE"  , "Address2":""  , "City":"WILLIAMSTOWN"  , "State":"VIC"  , "PostalCode":"3016"  , "StopFlag":"795159"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":629.2600000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 12:32:36 PM"  , "OldStartTime":"3/2/2018 12:32:36 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.856633"  , "Longitude":"144.89740699999993"  , "Kegs":0  , "Cases":1  , "Weight":16  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":20  , "OldSequence":20  , "Invoices":["795159"] }
//                 ,{
//                 "StopID":"385541"  , "CustomerID":"6843"  , "EventID":"385541"  , "NumUnitsStr":"1^0^1^" , "LoadSheetPhase":"3"  , "UserName":"ADVIEH"  , "Date":"3/2/2018"  , "Company":"ADVIEH"  , "Address":"71B GAMON ST"  , "Address2":""  , "City":"SEDDON"  , "State":"VIC"  , "PostalCode":"3011"  , "StopFlag":"794542"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":622.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 12:54:05 PM"  , "OldStartTime":"3/2/2018 12:54:05 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.809435"  , "Longitude":"144.89013699999998"  , "Kegs":0  , "Cases":1  , "Weight":14  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":21  , "OldSequence":21  , "Invoices":["794542"] }
//                 ,{
//                 "StopID":"385630"  , "CustomerID":"5920"  , "EventID":"385630"  , "NumUnitsStr":"4^0^4^" , "LoadSheetPhase":"3"  , "UserName":"THEPRINCEALB"  , "Date":"3/2/2018"  , "Company":"THE PRINCE ALBERT"  , "Address":"149 DOUGLAS PDE"  , "Address2":""  , "City":"WILLIAMSTOWN"  , "State":"VIC"  , "PostalCode":"3016"  , "StopFlag":"794751"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":688.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 1:14:27 PM"  , "OldStartTime":"3/2/2018 1:14:27 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8533571"  , "Longitude":"144.89609589999998"  , "Kegs":0  , "Cases":4  , "Weight":6  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":22  , "OldSequence":22  , "Invoices":["794751"] }
//                 ,{
//                 "StopID":"387463"  , "CustomerID":"101332"  , "EventID":"387463"  , "NumUnitsStr":"15^0^15^" , "LoadSheetPhase":"3"  , "UserName":"GAMICHICKE_8"  , "Date":"3/2/2018"  , "Company":"GAMI CHICKEN & BEER SOUTH MELB-Copy_5"  , "Address":"6 McLennan Drive"  , "Address2":""  , "City":"KENSINGTON"  , "State":"VIC"  , "PostalCode":"3031"  , "StopFlag":"794865"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":930.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 1:41:55 PM"  , "OldStartTime":"3/2/2018 1:41:55 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.7998039"  , "Longitude":"144.92954310000005"  , "Kegs":0  , "Cases":15  , "Weight":232  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":23  , "OldSequence":23  , "Invoices":["794865"] }
//                 ,{
//                 "StopID":"385092"  , "CustomerID":"8877"  , "EventID":"385092"  , "NumUnitsStr":"9^0^9^" , "LoadSheetPhase":"3"  , "UserName":"BARJOSEPHINE"  , "Date":"3/2/2018"  , "Company":"BAR JOSEPHINE"  , "Address":"295 BARKLY ST"  , "Address2":""  , "City":"FOOTSCRAY"  , "State":"VIC"  , "PostalCode":"3011"  , "StopFlag":"794119"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":801.7400000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 2:05:25 PM"  , "OldStartTime":"3/2/2018 2:05:25 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.799309"  , "Longitude":"144.89435500000002"  , "Kegs":0  , "Cases":9  , "Weight":88  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":24  , "OldSequence":24  , "Invoices":["794119"] }
//                 ,{
//                 "StopID":"385477"  , "CustomerID":"3057"  , "EventID":"385477"  , "NumUnitsStr":"12^0^12^" , "LoadSheetPhase":"3"  , "UserName":"SEDDONWINEST"  , "Date":"3/2/2018"  , "Company":"SEDDON WINE STORE"  , "Address":"2 101 VICTORIA STREET"  , "Address2":""  , "City":"SEDDON"  , "State":"VIC"  , "PostalCode":"3011"  , "StopFlag":"794455"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":860.2600000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 2:21:47 PM"  , "OldStartTime":"3/2/2018 2:21:47 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8059332"  , "Longitude":"144.8921299"  , "Kegs":0  , "Cases":12  , "Weight":107  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":25  , "OldSequence":25  , "Invoices":["794455"] }
//                 ,{
//                 "StopID":"386481"  , "CustomerID":"6504"  , "EventID":"386481"  , "NumUnitsStr":"4^0^4^" , "LoadSheetPhase":"3"  , "UserName":"LOLA"  , "Date":"3/2/2018"  , "Company":"LOLA"  , "Address":"77 CHARLES ST"  , "Address2":""  , "City":"SEDDON"  , "State":"VIC"  , "PostalCode":"3011"  , "StopFlag":"794856"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":691.7400000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 2:40:07 PM"  , "OldStartTime":"3/2/2018 2:40:07 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8068439"  , "Longitude":"144.89170660000002"  , "Kegs":0  , "Cases":4  , "Weight":51  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":26  , "OldSequence":26  , "Invoices":["794856"] }
//                 ,{
//                 "StopID":"388606"  , "CustomerID":"1952"  , "EventID":"388606"  , "NumUnitsStr":"11^0^11^" , "LoadSheetPhase":"3"  , "UserName":"HAPPYRIVERCA"  , "Date":"3/2/2018"  , "Company":"HAPPY RIVER CAFE PTY LTD"  , "Address":"45 MORELAND STREET"  , "Address2":""  , "City":"FOOTSCRAY"  , "State":"VIC"  , "PostalCode":"3013"  , "StopFlag":"794876"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":842.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 2:58:39 PM"  , "OldStartTime":"3/2/2018 2:58:39 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8030746"  , "Longitude":"144.90733879999993"  , "Kegs":0  , "Cases":11  , "Weight":150  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":27  , "OldSequence":27  , "Invoices":["794876"] }
//                 ,{
//                 "StopID":"388745"  , "CustomerID":"9576"  , "EventID":"388745"  , "NumUnitsStr":"6^0^6^" , "LoadSheetPhase":"3"  , "UserName":"AMOROSA"  , "Date":"3/2/2018"  , "Company":"AMOROSA"  , "Address":"70A FERGUSON ST"  , "Address2":""  , "City":"WILLIAMSTOWN"  , "State":"VIC"  , "PostalCode":"3016"  , "StopFlag":"795037"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":732.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 3:25:41 PM"  , "OldStartTime":"3/2/2018 3:25:41 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8588207"  , "Longitude":"144.89861659999997"  , "Kegs":0  , "Cases":6  , "Weight":83  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":28  , "OldSequence":28  , "Invoices":["795037"] }
//                 ,{
//                 "StopID":"388611"  , "CustomerID":"8850"  , "EventID":"388611"  , "NumUnitsStr":"11^0^11^" , "LoadSheetPhase":"3"  , "UserName":"THECREATORSL"  , "Date":"3/2/2018"  , "Company":"THE CREATORS LOUNGE"  , "Address":"116A HOPKINS ST"  , "Address2":""  , "City":"FOOTSCRAY"  , "State":"VIC"  , "PostalCode":"3011"  , "StopFlag":"794963"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":840.2400000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 3:53:53 PM"  , "OldStartTime":"3/2/2018 3:53:53 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.79974929999999"  , "Longitude":"144.9014419"  , "Kegs":0  , "Cases":11  , "Weight":128  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":29  , "OldSequence":29  , "Invoices":["795031","794963"] }
//                 ,{
//                 "StopID":"388760"  , "CustomerID":"4223"  , "EventID":"388760"  , "NumUnitsStr":"7^0^7^" , "LoadSheetPhase":"3"  , "UserName":"DANCINGDOGCA"  , "Date":"3/2/2018"  , "Company":"DANCING DOG CAFE"  , "Address":"42 ALBERT ST"  , "Address2":""  , "City":"FOOTSCRAY"  , "State":"VIC"  , "PostalCode":"3011"  , "StopFlag":"794761"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":749.3800000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 4:11:53 PM"  , "OldStartTime":"3/2/2018 4:11:53 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.80225"  , "Longitude":"144.897519"  , "Kegs":0  , "Cases":7  , "Weight":91  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":30  , "OldSequence":30  , "Invoices":["794761"] }
//                 ,{
//                 "StopID":"388793"  , "CustomerID":"100470"  , "EventID":"388793"  , "NumUnitsStr":"4^0^4^" , "LoadSheetPhase":"3"  , "UserName":"PRIDEOFOUR"  , "Date":"3/2/2018"  , "Company":"PRIDE OF OUR FOOTSCRAY COMMUNITY BAR"  , "Address":"LVL1, 86-88 HOPKINS ST"  , "Address2":""  , "City":"FOOTSCRAY"  , "State":"VIC"  , "PostalCode":"3011"  , "StopFlag":"795017"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":678.7600000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 4:28:22 PM"  , "OldStartTime":"3/2/2018 4:28:22 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.799886"  , "Longitude":"144.902413"  , "Kegs":0  , "Cases":4  , "Weight":33  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":31  , "OldSequence":31  , "Invoices":["795017"] }
//                 ,{
//                 "StopID":"385093"  , "CustomerID":"9488"  , "EventID":"385093"  , "NumUnitsStr":"1^0^1^" , "LoadSheetPhase":"3"  , "UserName":"CHARLESANDGA"  , "Date":"3/2/2018"  , "Company":"CHARLES AND GAMON"  , "Address":"2 GAMON ST"  , "Address2":""  , "City":"SEDDON"  , "State":"VIC"  , "PostalCode":"3011"  , "StopFlag":"794236"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":627.5000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 4:47:41 PM"  , "OldStartTime":"3/2/2018 4:47:41 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8068043"  , "Longitude":"144.89024970000003"  , "Kegs":0  , "Cases":1  , "Weight":10  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":32  , "OldSequence":32  , "Invoices":["794236"] }
//                 ,{
//                 "StopID":"385569"  , "CustomerID":"3798"  , "EventID":"385569"  , "NumUnitsStr":"2^0^2^" , "LoadSheetPhase":"3"  , "UserName":"WESTENDMARKE"  , "Date":"3/2/2018"  , "Company":"WESTEND MARKET HOTEL"  , "Address":"47 MACINTYRE RD"  , "Address2":""  , "City":"SUNSHINE"  , "State":"VIC"  , "PostalCode":"3020"  , "StopFlag":"794660"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":644.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 5:15:09 PM"  , "OldStartTime":"3/2/2018 5:15:09 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.7721911"  , "Longitude":"144.82850410000003"  , "Kegs":0  , "Cases":2  , "Weight":30  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":33  , "OldSequence":33  , "Invoices":["794660"] }
//                 ,{
//                 "StopID":"388699"  , "CustomerID":"8960"  , "EventID":"388699"  , "NumUnitsStr":"6^0^6^" , "LoadSheetPhase":"3"  , "UserName":"SUNSHINESOCI"  , "Date":"3/2/2018"  , "Company":"SUNSHINE SOCIAL"  , "Address":"64 GLENGALA RD"  , "Address2":""  , "City":"SUNSHINE"  , "State":"VIC"  , "PostalCode":"3020"  , "StopFlag":"794771"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":732.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 5:31:53 PM"  , "OldStartTime":"3/2/2018 5:31:53 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.790201"  , "Longitude":"144.81829200000004"  , "Kegs":0  , "Cases":6  , "Weight":76  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":34  , "OldSequence":34  , "Invoices":["794771"] }
//                 ,{
//                 "StopID":"388983"  , "CustomerID":"8629"  , "EventID":"388983"  , "NumUnitsStr":"7^0^7^" , "LoadSheetPhase":"3"  , "UserName":"HOPNATION"  , "Date":"3/2/2018"  , "Company":"HOP NATION"  , "Address":"UNIT 6 107\/109 WHITEHALL ST"  , "Address2":""  , "City":"FOOTSCRAY"  , "State":"VIC"  , "PostalCode":"3011"  , "StopFlag":"795092"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":754.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 6:00:05 PM"  , "OldStartTime":"3/2/2018 6:00:05 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                 ]
//                 , "Latitude":"-37.8100723"  , "Longitude":"144.9041069"  , "Kegs":0  , "Cases":7  , "Weight":52  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":35  , "OldSequence":35  , "Invoices":["795092"] }
//                 ,{
//                 "StopID":"388984"  , "CustomerID":"7853"  , "EventID":"388984"  , "NumUnitsStr":"3^0^3^" , "LoadSheetPhase":"3"  , "UserName":"SAVVYCELLARS"  , "Date":"3/2/2018"  , "Company":"SAVVY CELLARS ALTONA"  , "Address":"49 CIVIC PDE"  , "Address2":""  , "City":"ALTONA"  , "State":"VIC"  , "PostalCode":"3018"  , "StopFlag":"795105"  , "FromLoadSheet":"8 WEST (FOOTSCRAY) FRIDAY"  , "Fsm":0  , "CustomerDuration":666.0000000000000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "StartTimePlanned":"3/2/2018 6:29:39 PM"  , "OldStartTime":"3/2/2018 6:29:39 PM"  , "CanMove":"1"  , "InvoiceLocked":"0"  , "OldClosestMatchingServiceWindowID":"0"  , "Services":[
//                   {
//                     "StartTime":"11:00 AM",
//                     "EndTime":"4:00 PM",
//                     "Mon":"True",
//                     "Tus":"True",
//                     "Wen":"True",
//                     "Thu":"True",
//                     "Fri":"True",
//                     "Sat":"False",
//                     "Sun":"False",
//                     "ServiceWindowID":"3604"
//                   }
//                 ]
//                 , "Latitude":"-37.8650759"  , "Longitude":"144.8381604"  , "Kegs":0  , "Cases":3  , "Weight":34  , "OldLoadSheetID":"12385"  , "Deleted":"false"  , "Sequence":36  , "OldSequence":36  , "Invoices":["795105"] }
//               ]}
//
//
//
//           ]}
//
//
//       ;
//
//     const routePlannerRootJson =
//         {
//           "DrawDirection":"True", "ReSeqSetting":"0", "CustomerEditPermission": "True", "RouteEditPermission": "True", "DateFormat":1, "TimeFormat":1, "ShowProductPickTypesetting":"", "ShowExtPrice":"true", "Routes":
//           [
//             {
//               "RouteID":"4"  , "PickTypes":"*^KEG^PKG^Z^SODA^Cans^Total^* per Week^KEG per Week^PKG per Week^Z per Week^SODA per Week^Cans per Week^Total per Week"
//               , "RouteNum":"101"  , "Route":"101 Tues Sterling"  , "RouteVersionID":"1"  , "RouteVersion":"A"  , "Deliveryman":"Robby"  , "Activity":"Delivery"  , "NextDate":"3/13/2018"  , "CostPerMile":""  , "RouteFrequency":1  , "DeliveryDay":"Tuesday"  , "StartTime":"6:00 AM"  , "OldEndTime":"7:00 PM"  , "EndTime":"0"
//               , "Duration":0
//               , "PlannedDistance":0.000000 , "StartMapPointID":"1"  , "EndMapPointID":"1"  , "Color":"228B22"  , "Latitude":"40.624517"  , "Longitude":"-103.284469"  , "LocationID":"1"  , "Address":"15611 Tanya St,"  , "City":"Sterling"  , "State":"CO"  , "PostalCode":"80751"  , "Stops":
//               [
//                 {
//                   "StopID":"6749"  , "CustomerID":"107"  , "Seq":"5"  , "UserName":"SUNMART_2"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Sunmart #3271"  , "Address":"217 South 3rd Avenue"  , "City":"Sterling"  , "State":"CO"  , "PostalCode":"80751"  , "Latitude":"40.62430666935483"  , "Longitude":"-103.21460147724608"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"4^0^480^0^0^0^484^0^0^40^0^0^0^40^" , "StopsperWeek":"0.750000"  , "WeeklySumOfCaseEquiv":"48.917"  , "WeeklySumOfCases":"40.333"  , "OSEQ":"5"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":1451.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"5490.47"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "6749"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "13"  , "OldPhase":"13"  , "Sequence":"5"  , "OldSequence":"5"  , "OldRouteID":"4" } ] }
//                 ,
//                 {
//                   "StopID":"7073"  , "CustomerID":"265"  , "Seq":"6"  , "UserName":"BAMBOO"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Bamboo Garden"  , "Address":"1027 W. Main Street"  , "City":"Sterling"  , "State":"CO"  , "PostalCode":"80751"  , "Latitude":"40.62483400000001"  , "Longitude":"-103.22835099999998"  , "WarehouseByStopDistance":5.191  , "NumUnitsStr":"0^0^0^0^0^0^0^0^0^0^0^0^0^0^" , "StopsperWeek":"0.500000"  , "WeeklySumOfCaseEquiv":"0"  , "WeeklySumOfCases":"0"  , "OSEQ":"6"  , "OnPremise":"True"  , "DraftPackage":"2"  , "CustomerDuration":0.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"0"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "7073"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "1"  , "OldPhase":"1"  , "Sequence":"6"  , "OldSequence":"6"  , "OldRouteID":"4" } ] }
//                 ,
//                 {
//                   "StopID":"6769"  , "CustomerID":"133"  , "Seq":"9"  , "UserName":"EAGLE1"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Eagle #1"  , "Address":"930 West Main"  , "City":"Sterling"  , "State":"CO"  , "PostalCode":"80751"  , "Latitude":"40.625304"  , "Longitude":"-103.223812"  , "WarehouseByStopDistance":5.634  , "NumUnitsStr":"0^0^128^0^0^0^128^0^0^11^0^0^0^11^" , "StopsperWeek":"1.000000"  , "WeeklySumOfCaseEquiv":"12.369"  , "WeeklySumOfCases":"10.667"  , "OSEQ":"9"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":384.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"4776.5"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "6769"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "13"  , "OldPhase":"13"  , "Sequence":"9"  , "OldSequence":"9"  , "OldRouteID":"4" } ] }
//                 ,
//                 {
//                   "StopID":"168"  , "CustomerID":"2510"  , "Seq":"12"  , "UserName":"NICKS"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Nick\u0027s 3rd Ave Liquor"  , "Address":"115 S 3rd Ave"  , "City":"Sterling"  , "State":"CO"  , "PostalCode":"80751"  , "Latitude":"40.62496682995115"  , "Longitude":"-103.21495682001114"  , "WarehouseByStopDistance":6.366  , "NumUnitsStr":"0^5^3095^0^0^0^3100^0^0^258^0^0^0^258^" , "StopsperWeek":"3.000000"  , "WeeklySumOfCaseEquiv":"272.971"  , "WeeklySumOfCases":"258.354"  , "OSEQ":"12"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":9300.750012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"59271.47"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "168"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"12"  , "OldSequence":"12"  , "OldRouteID":"4" } ] }
//                 ,
//                 {
//                   "StopID":"146"  , "CustomerID":"2580"  , "Seq":"15"  , "UserName":"711SRL"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"7-11 STERLING 15041"  , "Address":"381 WEST MAIN STREET"  , "City":"Sterling"  , "State":"CO"  , "PostalCode":"80751"  , "Latitude":"40.625299356448764"  , "Longitude":"-103.2155906274391"  , "WarehouseByStopDistance":6.271  , "NumUnitsStr":"16^0^200^0^0^0^216^1^0^17^0^0^0^18^" , "StopsperWeek":"1.500000"  , "WeeklySumOfCaseEquiv":"22.801"  , "WeeklySumOfCases":"18"  , "OSEQ":"15"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":648.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"6840.52"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "146"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"15"  , "OldSequence":"15"  , "OldRouteID":"4" } ] }
//                 ,
//                 {
//                   "StopID":"236"  , "CustomerID":"2530"  , "Seq":"16"  , "UserName":"PH_STL"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Pizza Hut-Sterling"  , "Address":"Na"  , "City":"Sterling"  , "State":"CO"  , "PostalCode":"80720"  , "Latitude":"40.62551604260231"  , "Longitude":"-103.21451038236998"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^4^0^0^0^4^0^0^0^0^0^0^0^" , "StopsperWeek":"0.500000"  , "WeeklySumOfCaseEquiv":"0.333"  , "WeeklySumOfCases":"0.333"  , "OSEQ":"16"  , "OnPremise":"True"  , "DraftPackage":"3"  , "CustomerDuration":11.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"81.2"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "236"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "1"  , "OldPhase":"1"  , "Sequence":"16"  , "OldSequence":"16"  , "OldRouteID":"4" } ] }
//                 ,
//                 {
//                   "StopID":"6755"  , "CustomerID":"114"  , "Seq":"19"  , "UserName":"WALGREEN-STR"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Walgreens 09783 (Sterling)"  , "Address":"101 West Main"  , "City":"Sterling"  , "State":"CO"  , "PostalCode":"80751"  , "Latitude":"40.624898"  , "Longitude":"-103.212237"  , "WarehouseByStopDistance":6.587  , "NumUnitsStr":"15^0^322^0^0^0^337^1^0^27^0^0^0^28^" , "StopsperWeek":"2.000000"  , "WeeklySumOfCaseEquiv":"31.266"  , "WeeklySumOfCases":"28.083"  , "OSEQ":"19"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":1010.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"4518.75"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "6755"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"19"  , "OldSequence":"19"  , "OldRouteID":"4" } ] }
//                 ,
//                 {
//                   "StopID":"8665"  , "CustomerID":"948"  , "Seq":"22"  , "UserName":"FAMILY_2"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Family Food Mart"  , "Address":"419 N 3rd St Ste A"  , "City":"Sterling"  , "State":"CO"  , "PostalCode":"80751"  , "Latitude":"40.627934"  , "Longitude":"-103.2061"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^221^0^0^0^221^0^0^18^0^0^0^18^" , "StopsperWeek":"1.000000"  , "WeeklySumOfCaseEquiv":"22.123"  , "WeeklySumOfCases":"18.417"  , "OSEQ":"22"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":663.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"2397.5"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "8665"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "13"  , "OldPhase":"13"  , "Sequence":"22"  , "OldSequence":"22"  , "OldRouteID":"4" } ] }
//                 ,
//                 {
//                   "StopID":"169"  , "CustomerID":"2545"  , "Seq":"24"  , "UserName":"DISCOUNT"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Discount Liquors"  , "Address":"1000 W Main"  , "City":"Sterling"  , "State":"CO"  , "PostalCode":"80751"  , "Latitude":"40.6253599"  , "Longitude":"-103.2249129"  , "WarehouseByStopDistance":5.782  , "NumUnitsStr":"0^28^4546^0^0^0^4574^0^2^379^0^0^0^381^" , "StopsperWeek":"3.000000"  , "WeeklySumOfCaseEquiv":"415.711"  , "WeeklySumOfCases":"381.167"  , "OSEQ":"24"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":13722.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                   {
//                     "StartTime":"7:00 AM",
//                     "EndTime":"9:00 AM",
//                     "Mon":"True",
//                     "Tue":"True",
//                     "Wed":"True",
//                     "Thu":"True",
//                     "Fri":"True",
//                     "Sat":"False",
//                     "Sun":"False"
//                   }
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"92739.75"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "169"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"24"  , "OldSequence":"24"  , "OldRouteID":"4" } ] }
//                 ,
//                 {
//                   "StopID":"165"  , "CustomerID":"2390"  , "Seq":"25"  , "UserName":"ELMST"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Elm Street Liquor"  , "Address":"201 Elm Street"  , "City":"Sterling"  , "State":"CO"  , "PostalCode":"80751"  , "Latitude":"40.62916791784575"  , "Longitude":"-103.20339365906295"  , "WarehouseByStopDistance":7.727  , "NumUnitsStr":"0^11^2332^0^0^0^2343^0^1^194^0^0^0^195^" , "StopsperWeek":"3.000000"  , "WeeklySumOfCaseEquiv":"217.123"  , "WeeklySumOfCases":"195.25"  , "OSEQ":"25"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":7029.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"42872.35"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "165"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"25"  , "OldSequence":"25"  , "OldRouteID":"4" } ] }
//                 ,
//                 {
//                   "StopID":"8683"  , "CustomerID":"957"  , "Seq":"26"  , "UserName":"WineSpirits"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Broadway Wine and Spirits"  , "Address":"207 Broadway St."  , "City":"Sterling"  , "State":"CO"  , "PostalCode":"80751"  , "Latitude":"40.63274"  , "Longitude":"-103.201225"  , "WarehouseByStopDistance":8.089  , "NumUnitsStr":"0^0^2135^0^0^0^2135^0^0^178^0^0^0^178^" , "StopsperWeek":"3.000000"  , "WeeklySumOfCaseEquiv":"185.795"  , "WeeklySumOfCases":"177.917"  , "OSEQ":"26"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":6405.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"42568.57"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "8683"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"26"  , "OldSequence":"26"  , "OldRouteID":"4" } ] }
//                 ,
//                 {
//                   "StopID":"8658"  , "CustomerID":"939"  , "Seq":"29"  , "UserName":"DOLLAR"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Family Dollar (Sterling)"  , "Address":"100 Broadway St, Ste 15c"  , "City":"Sterling"  , "State":"CO"  , "PostalCode":"80751"  , "Latitude":"40.634331"  , "Longitude":"-103.19986"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^66^0^0^0^66^0^0^6^0^0^0^6^" , "StopsperWeek":"1.000000"  , "WeeklySumOfCaseEquiv":"7.535"  , "WeeklySumOfCases":"5.5"  , "OSEQ":"29"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":198.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"632.46"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "8658"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "13"  , "OldPhase":"13"  , "Sequence":"29"  , "OldSequence":"29"  , "OldRouteID":"4" } ] }
//                 ,
//                 {
//                   "StopID":"446"  , "CustomerID":"2560"  , "Seq":"37"  , "UserName":"RIVERGLF"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Riverview Golf Club"  , "Address":"13064 Rd 370"  , "City":"Sterling"  , "State":"CO"  , "PostalCode":"80751"  , "Latitude":"40.6277019"  , "Longitude":"-103.1772814"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^39^93^0^0^0^132^0^3^8^0^0^0^11^" , "StopsperWeek":"0.750000"  , "WeeklySumOfCaseEquiv":"19.743"  , "WeeklySumOfCases":"11"  , "OSEQ":"37"  , "OnPremise":"True"  , "DraftPackage":"2"  , "CustomerDuration":396.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"5928.5"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "446"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "13"  , "OldPhase":"13"  , "Sequence":"37"  , "OldSequence":"37"  , "OldRouteID":"4" } ] }
//                 ,
//                 {
//                   "StopID":"166"  , "CustomerID":"2422"  , "Seq":"39"  , "UserName":"HAROLDS"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Harolds Liquor"  , "Address":"336 E Hwy 6"  , "City":"Sterling"  , "State":"CO"  , "PostalCode":"80751"  , "Latitude":"40.621912311194166"  , "Longitude":"-103.19735344607163"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^172^0^0^0^172^0^0^14^0^0^0^14^" , "StopsperWeek":"0.750000"  , "WeeklySumOfCaseEquiv":"14.949"  , "WeeklySumOfCases":"14.333"  , "OSEQ":"39"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":515.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"3788.85"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "166"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "13"  , "OldPhase":"13"  , "Sequence":"39"  , "OldSequence":"39"  , "OldRouteID":"4" } ] }
//                 ,
//                 {
//                   "StopID":"167"  , "CustomerID":"2470"  , "Seq":"41"  , "UserName":"MAJOR"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Major Liquor"  , "Address":"529 Iris Dr"  , "City":"Sterling"  , "State":"CO"  , "PostalCode":"80751"  , "Latitude":"40.610676"  , "Longitude":"-103.2188592"  , "WarehouseByStopDistance":7.421  , "NumUnitsStr":"0^17^2525^0^0^0^2541^0^1^210^0^0^0^211^" , "StopsperWeek":"3.000000"  , "WeeklySumOfCaseEquiv":"230.921"  , "WeeklySumOfCases":"211.792"  , "OSEQ":"41"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":7624.500012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"48137.93"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "167"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"41"  , "OldSequence":"41"  , "OldRouteID":"4" } ] }
//                 ,
//                 {
//                   "StopID":"6767"  , "CustomerID":"131"  , "Seq":"42"  , "UserName":"EAGLE2"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Eagle #2"  , "Address":"213 East Chestnut"  , "City":"Sterling"  , "State":"CO"  , "PostalCode":"80751"  , "Latitude":"40.624521"  , "Longitude":"-103.203009"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^142^0^0^0^142^0^0^12^0^0^0^12^" , "StopsperWeek":"1.000000"  , "WeeklySumOfCaseEquiv":"13.475"  , "WeeklySumOfCases":"11.833"  , "OSEQ":"42"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":425.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"5175.8"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "6767"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "13"  , "OldPhase":"13"  , "Sequence":"42"  , "OldSequence":"42"  , "OldRouteID":"4" } ] }
//                 ,
//                 {
//                   "StopID":"170"  , "CustomerID":"1026"  , "Seq":"44"  , "UserName":"WALMT-STERL"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Wal-Mart #924 Sterling"  , "Address":"1510 W Main"  , "City":"Sterling"  , "State":"CO"  , "PostalCode":"80751"  , "Latitude":"40.625239534951"  , "Longitude":"-103.23784153278808"  , "WarehouseByStopDistance":4.521  , "NumUnitsStr":"36^0^3151^0^0^0^3187^3^0^263^0^0^0^266^" , "StopsperWeek":"3.000000"  , "WeeklySumOfCaseEquiv":"274.018"  , "WeeklySumOfCases":"265.583"  , "OSEQ":"44"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":9560.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"42799.81"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "170"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"44"  , "OldSequence":"44"  , "OldRouteID":"4" } ] }
//                 ,
//                 {
//                   "StopID":"8640"  , "CustomerID":"927"  , "Seq":"810"  , "UserName":"BRADLEY"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Bradley Petroleum Sterling"  , "Address":"403 West Main"  , "City":"Sterling"  , "State":"CO"  , "PostalCode":"80751"  , "Latitude":"40.6250495910645"  , "Longitude":"-103.217025756836"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^28^0^0^0^28^0^0^2^0^0^0^2^" , "StopsperWeek":"0.500000"  , "WeeklySumOfCaseEquiv":"2.588"  , "WeeklySumOfCases":"2.333"  , "OSEQ":"810"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":83.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"1033.1"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "8640"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "1"  , "OldPhase":"1"  , "Sequence":"810"  , "OldSequence":"810"  , "OldRouteID":"4" } ] }
//                 ,
//                 {
//                   "StopID":"185"  , "CustomerID":"2660"  , "Seq":"815"  , "UserName":"RIVERCTY"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"River City Grill Inc."  , "Address":"1116 W Main"  , "City":"Sterling"  , "State":"CO"  , "PostalCode":"80751"  , "Latitude":"40.6252562"  , "Longitude":"-103.2273817"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^12^31^0^0^0^43^0^1^3^0^0^0^4^" , "StopsperWeek":"0.500000"  , "WeeklySumOfCaseEquiv":"10.681"  , "WeeklySumOfCases":"3.583"  , "OSEQ":"815"  , "OnPremise":"True"  , "DraftPackage":"2"  , "CustomerDuration":128.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"2686.5"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "185"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "1"  , "OldPhase":"1"  , "Sequence":"815"  , "OldSequence":"815"  , "OldRouteID":"4" } ] }
//                 ,
//                 {
//                   "StopID":"6835"  , "CustomerID":"2594"  , "Seq":"830"  , "UserName":"CONOCOST"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Amul LLC (Conoco)"  , "Address":"230 Broadway"  , "City":"Sterling"  , "State":"CO"  , "PostalCode":"80751"  , "Latitude":"40.6331736"  , "Longitude":"-103.2011506"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^54^0^0^0^54^0^0^4^0^0^0^4^" , "StopsperWeek":"0.500000"  , "WeeklySumOfCaseEquiv":"5.594"  , "WeeklySumOfCases":"4.5"  , "OSEQ":"830"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":162.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"2209.4"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "6835"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "1"  , "OldPhase":"1"  , "Sequence":"830"  , "OldSequence":"830"  , "OldRouteID":"4" } ] }
//                 ,
//                 {
//                   "StopID":"8692"  , "CustomerID":"973"  , "Seq":"855"  , "UserName":"SMOKER"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Smoker Friendly #104"  , "Address":"1001 West Main"  , "City":"Sterling"  , "State":"CO"  , "PostalCode":"80751"  , "Latitude":"40.6248742"  , "Longitude":"-103.22756270000002"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^4^0^0^0^4^0^0^0^0^0^0^0^" , "StopsperWeek":"0.500000"  , "WeeklySumOfCaseEquiv":"0.333"  , "WeeklySumOfCases":"0.333"  , "OSEQ":"855"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":11.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"139.6"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "8692"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "1"  , "OldPhase":"1"  , "Sequence":"855"  , "OldSequence":"855"  , "OldRouteID":"4" } ] }
//               ]
//             },
//             {
//               "RouteID":"130"  , "PickTypes":"*^KEG^PKG^Z^SODA^Cans^Total^* per Week^KEG per Week^PKG per Week^Z per Week^SODA per Week^Cans per Week^Total per Week"
//               , "RouteNum":"102"  , "Route":"102 Mon Morgan\/Akron"  , "RouteVersionID":"1"  , "RouteVersion":"A"  , "Deliveryman":"TREY"  , "Activity":"Delivery"  , "NextDate":"4/6/2015"  , "CostPerMile":"0.74"  , "RouteFrequency":1  , "DeliveryDay":"Monday"  , "StartTime":"6:00 AM"  , "OldEndTime":"4:00 PM"  , "EndTime":"0"
//               , "Duration":0
//               , "PlannedDistance":0.000000 , "StartMapPointID":"1"  , "EndMapPointID":"1"  , "Color":"EE8262"  , "Latitude":"40.624517"  , "Longitude":"-103.284469"  , "LocationID":"1"  , "Address":"15611 Tanya St,"  , "City":"Sterling"  , "State":"CO"  , "PostalCode":"80751"  , "Stops":
//               [
//                 {
//                   "StopID":"8688"  , "CustomerID":"966"  , "Seq":"0"  , "UserName":"5STAR"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"5 Star Restaurant"  , "Address":"Main Street"  , "City":"Akron"  , "State":"CO"  , "PostalCode":"80751"  , "Latitude":"40.15880518894449"  , "Longitude":"-103.21339961351896"  , "WarehouseByStopDistance":58.365  , "NumUnitsStr":"0^0^16^0^0^0^16^0^0^1^0^0^0^1^" , "StopsperWeek":"1.250000"  , "WeeklySumOfCaseEquiv":"1.333"  , "WeeklySumOfCases":"1.333"  , "OSEQ":"0"  , "OnPremise":"True"  , "DraftPackage":"2"  , "CustomerDuration":47.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"394"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "8688"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"0"  , "OldSequence":"0"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"8685"  , "CustomerID":"959"  , "Seq":"0"  , "UserName":"BRUSHTRAVEL"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"SB Brush Travel Stop"  , "Address":"1156 N. Colorado Ave"  , "City":"Brush"  , "State":"CO"  , "PostalCode":"80723"  , "Latitude":"40.2710494995117"  , "Longitude":"-103.623085021973"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"12^0^144^0^0^0^156^1^0^12^0^0^0^13^" , "StopsperWeek":"1.500000"  , "WeeklySumOfCaseEquiv":"15.061"  , "WeeklySumOfCases":"13"  , "OSEQ":"0"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":468.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"3983.2"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "8685"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"0"  , "OldSequence":"0"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"6984"  , "CustomerID":"208"  , "Seq":"0"  , "UserName":"CLARIONINN"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Clarion Inn"  , "Address":"14378 Hwy 34"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.25414"  , "Longitude":"-103.8778817"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^14^0^0^0^14^0^0^1^0^0^0^1^" , "StopsperWeek":"0.750000"  , "WeeklySumOfCaseEquiv":"1.167"  , "WeeklySumOfCases":"1.167"  , "OSEQ":"0"  , "OnPremise":"True"  , "DraftPackage":"2"  , "CustomerDuration":42.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"362.85"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "6984"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "13"  , "OldPhase":"13"  , "Sequence":"0"  , "OldSequence":"0"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"7081"  , "CustomerID":"124"  , "Seq":"0"  , "UserName":"DAVBROS"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Davis Brothers"  , "Address":"351 E First Street"  , "City":"Akron"  , "State":"CO"  , "PostalCode":"80720"  , "Latitude":"40.1591458"  , "Longitude":"-103.2093263"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^21^0^0^0^21^0^0^2^0^0^0^2^" , "StopsperWeek":"1.250000"  , "WeeklySumOfCaseEquiv":"2.05"  , "WeeklySumOfCases":"1.75"  , "OSEQ":"0"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":63.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"817.3"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "7081"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"0"  , "OldSequence":"0"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"2357"  , "CustomerID":"2670"  , "Seq":"0"  , "UserName":"DEWEYS"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Deweys"  , "Address":"41611 Marble Ave"  , "City":"Stoneham"  , "State":"CO"  , "PostalCode":"80754"  , "Latitude":"40.603884"  , "Longitude":"-103.665977"  , "WarehouseByStopDistance":33.495  , "NumUnitsStr":"0^0^24^0^0^0^24^0^0^2^0^0^0^2^" , "StopsperWeek":"0.750000"  , "WeeklySumOfCaseEquiv":"2"  , "WeeklySumOfCases":"2"  , "OSEQ":"0"  , "OnPremise":"True"  , "DraftPackage":"2"  , "CustomerDuration":72.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"561.3"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "2357"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "13"  , "OldPhase":"13"  , "Sequence":"0"  , "OldSequence":"0"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"7098"  , "CustomerID":"301"  , "Seq":"0"  , "UserName":"DOLITTLES"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Dolittles"  , "Address":"275 East 1st"  , "City":"Akron"  , "State":"CO"  , "PostalCode":"80720"  , "Latitude":"40.1591497"  , "Longitude":"-103.21029920000001"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^10^137^0^0^0^147^0^1^11^0^0^0^12^" , "StopsperWeek":"1.500000"  , "WeeklySumOfCaseEquiv":"14.856"  , "WeeklySumOfCases":"12.25"  , "OSEQ":"0"  , "OnPremise":"True"  , "DraftPackage":"2"  , "CustomerDuration":441.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"4083.95"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "7098"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"0"  , "OldSequence":"0"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"8660"  , "CustomerID":"942"  , "Seq":"0"  , "UserName":"FAMILYDOL"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Family Dollar (Akron)"  , "Address":"152 W 1st St"  , "City":"Akron"  , "State":"CO"  , "PostalCode":"80720"  , "Latitude":"40.1590841263533"  , "Longitude":"-103.213501721621"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^0^0^0^0^0^0^0^0^0^0^0^0^" , "StopsperWeek":"1.250000"  , "WeeklySumOfCaseEquiv":"0"  , "WeeklySumOfCases":"0"  , "OSEQ":"0"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":0.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"0"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "8660"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"0"  , "OldSequence":"0"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"8649"  , "CustomerID":"932"  , "Seq":"0"  , "UserName":"JDS"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"JD\u0027s Quick Stop (Brush)"  , "Address":"1113 Edison Street"  , "City":"Brush"  , "State":"CO"  , "PostalCode":"80723"  , "Latitude":"40.2550672"  , "Longitude":"-103.6334419"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^35^0^0^0^35^0^0^3^0^0^0^3^" , "StopsperWeek":"1.250000"  , "WeeklySumOfCaseEquiv":"3.461"  , "WeeklySumOfCases":"2.917"  , "OSEQ":"0"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":105.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"1268.7"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "8649"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"0"  , "OldSequence":"0"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"8644"  , "CustomerID":"931"  , "Seq":"0"  , "UserName":"MIDWAY"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Midway Grill"  , "Address":"Po Box 123"  , "City":"New Raymer"  , "State":"CO"  , "PostalCode":"80742"  , "Latitude":"40.6085205078125"  , "Longitude":"-103.845252990723"  , "WarehouseByStopDistance":48.323  , "NumUnitsStr":"0^0^38^0^0^0^38^0^0^3^0^0^0^3^" , "StopsperWeek":"0.750000"  , "WeeklySumOfCaseEquiv":"3.101"  , "WeeklySumOfCases":"3.167"  , "OSEQ":"0"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":114.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"437"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "8644"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "24"  , "OldPhase":"24"  , "Sequence":"0"  , "OldSequence":"0"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"7068"  , "CustomerID":"262"  , "Seq":"0"  , "UserName":"MOJOS"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Mojo\u0027s Inn"  , "Address":"625 E 1st Street"  , "City":"Akron"  , "State":"CO"  , "PostalCode":"80720"  , "Latitude":"40.1592028"  , "Longitude":"-103.20557859999997"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^0^0^0^0^0^0^0^0^0^0^0^0^" , "StopsperWeek":"1.250000"  , "WeeklySumOfCaseEquiv":"0"  , "WeeklySumOfCases":"0"  , "OSEQ":"0"  , "OnPremise":"True"  , "DraftPackage":"2"  , "CustomerDuration":0.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"0"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "7068"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"0"  , "OldSequence":"0"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"8621"  , "CustomerID":"909"  , "Seq":"0"  , "UserName":"ODELLS"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Odell\u0027s"  , "Address":"222 E 1st Street"  , "City":"Akron"  , "State":"CO"  , "PostalCode":"80720"  , "Latitude":"40.1591075956821"  , "Longitude":"-103.210969716311"  , "WarehouseByStopDistance":58.109  , "NumUnitsStr":"7^0^292^0^0^0^299^1^0^24^0^0^0^25^" , "StopsperWeek":"1.500000"  , "WeeklySumOfCaseEquiv":"26.896"  , "WeeklySumOfCases":"24.917"  , "OSEQ":"0"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":897.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"4079.8"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "8621"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"0"  , "OldSequence":"0"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"6971"  , "CustomerID":"195"  , "Seq":"0"  , "UserName":"PAWNEEST"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Pawnee Station"  , "Address":"134 Raymer Avenue"  , "City":"New Raymer"  , "State":"CO"  , "PostalCode":"80742"  , "Latitude":"40.6091733"  , "Longitude":"-103.8411164"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^8^30^0^0^0^38^0^1^2^0^0^0^3^" , "StopsperWeek":"0.750000"  , "WeeklySumOfCaseEquiv":"7.093"  , "WeeklySumOfCases":"3.167"  , "OSEQ":"0"  , "OnPremise":"True"  , "DraftPackage":"2"  , "CustomerDuration":114.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"1642.15"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "6971"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "13"  , "OldPhase":"13"  , "Sequence":"0"  , "OldSequence":"0"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"145"  , "CustomerID":"1120"  , "Seq":"17"  , "UserName":"WASHGOLF"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Washington County Golf Club"  , "Address":"39469 Hwy 63"  , "City":"Akron"  , "State":"CO"  , "PostalCode":"80720"  , "Latitude":"40.1387242"  , "Longitude":"-103.2100941"  , "WarehouseByStopDistance":60.201  , "NumUnitsStr":"0^2^162^0^0^0^164^0^0^14^0^0^0^14^" , "StopsperWeek":"1.250000"  , "WeeklySumOfCaseEquiv":"14.633"  , "WeeklySumOfCases":"13.667"  , "OSEQ":"17"  , "OnPremise":"True"  , "DraftPackage":"2"  , "CustomerDuration":492.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"3719.2"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "145"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"17"  , "OldSequence":"17"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"2334"  , "CustomerID":"1555"  , "Seq":"19"  , "UserName":"HOMEPLAT"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Home Plate Rest."  , "Address":"19719 Hwy 34"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.2483631"  , "Longitude":"-103.7960382"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^22^0^0^0^22^0^0^2^0^0^0^2^" , "StopsperWeek":"1.250000"  , "WeeklySumOfCaseEquiv":"1.833"  , "WeeklySumOfCases":"1.833"  , "OSEQ":"19"  , "OnPremise":"True"  , "DraftPackage":"3"  , "CustomerDuration":65.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"602.35"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "2334"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"19"  , "OldSequence":"19"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"225"  , "CustomerID":"1070"  , "Seq":"22"  , "UserName":"ELKSAKRN"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Elks Club-Akron"  , "Address":"181 Ash Avenue"  , "City":"Akron"  , "State":"CO"  , "PostalCode":"80720"  , "Latitude":"40.1599491"  , "Longitude":"-103.2114859"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^5^0^0^0^5^0^0^0^0^0^0^0^" , "StopsperWeek":"1.250000"  , "WeeklySumOfCaseEquiv":"0.417"  , "WeeklySumOfCases":"0.417"  , "OSEQ":"22"  , "OnPremise":"True"  , "DraftPackage":"3"  , "CustomerDuration":15.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"111.75"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "225"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"22"  , "OldSequence":"22"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"2415"  , "CustomerID":"77"  , "Seq":"25"  , "UserName":"JDQUIK"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"JD Quik Stop"  , "Address":"352 W 1st Street"  , "City":"Akron"  , "State":"CO"  , "PostalCode":"80720"  , "Latitude":"40.1590758"  , "Longitude":"-103.2162522"  , "WarehouseByStopDistance":58.558  , "NumUnitsStr":"12^0^67^0^0^0^79^1^0^6^0^0^0^7^" , "StopsperWeek":"1.500000"  , "WeeklySumOfCaseEquiv":"8.129"  , "WeeklySumOfCases":"6.583"  , "OSEQ":"25"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":236.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"2455.6"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "2415"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"25"  , "OldSequence":"25"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"2406"  , "CustomerID":"67"  , "Seq":"42"  , "UserName":"CO_CATTL"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"CO Cattle Co Guest Ranch"  , "Address":"70008 WCR 132"  , "City":"New Raymer"  , "State":"CO"  , "PostalCode":"80742"  , "Latitude":"40.606156"  , "Longitude":"-103.843825"  , "WarehouseByStopDistance":47.899  , "NumUnitsStr":"0^0^0^0^0^0^0^0^0^0^0^0^0^0^" , "StopsperWeek":"1.250000"  , "WeeklySumOfCaseEquiv":"0"  , "WeeklySumOfCases":"0"  , "OSEQ":"42"  , "OnPremise":"True"  , "DraftPackage":"2"  , "CustomerDuration":0.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"0"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "2406"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"42"  , "OldSequence":"42"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"6980"  , "CustomerID":"205"  , "Seq":"808"  , "UserName":"WESTERN"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Western Convenience # 145"  , "Address":"825 Main Street"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.2569907"  , "Longitude":"-103.801532"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^0^0^0^0^0^0^0^0^0^0^0^0^" , "StopsperWeek":"1.250000"  , "WeeklySumOfCaseEquiv":"0"  , "WeeklySumOfCases":"0"  , "OSEQ":"808"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":0.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"0"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "6980"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"808"  , "OldSequence":"808"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"529"  , "CustomerID":"1013"  , "Seq":"838"  , "UserName":"THEGRAS"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"The Grasshopper"  , "Address":"364 E First St"  , "City":"Akron"  , "State":"CO"  , "PostalCode":"80720"  , "Latitude":"40.159002"  , "Longitude":"-103.2091622"  , "WarehouseByStopDistance":57.956  , "NumUnitsStr":"0^3^2030^0^0^0^2033^0^0^169^0^0^0^169^" , "StopsperWeek":"3.000000"  , "WeeklySumOfCaseEquiv":"181.548"  , "WeeklySumOfCases":"169.417"  , "OSEQ":"838"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":6099.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"37395.7"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "529"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"838"  , "OldSequence":"838"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"2368"  , "CustomerID":"1640"  , "Seq":"855"  , "UserName":"MAVER"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"THE MAV. TAP HOUSE"  , "Address":"1409 Barlow Rd"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.2640624"  , "Longitude":"-103.7727077"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^18^29^0^0^0^47^0^2^2^0^0^0^4^" , "StopsperWeek":"0.750000"  , "WeeklySumOfCaseEquiv":"8.54"  , "WeeklySumOfCases":"3.917"  , "OSEQ":"855"  , "OnPremise":"True"  , "DraftPackage":"2"  , "CustomerDuration":141.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"2780.95"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "2368"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "13"  , "OldPhase":"13"  , "Sequence":"855"  , "OldSequence":"855"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"2365"  , "CustomerID":"1540"  , "Seq":"1005"  , "UserName":"ELKSFM"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Elks Club-Fort Morgan"  , "Address":"430 State Street"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.2516675"  , "Longitude":"-103.8002151"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^8^0^0^0^8^0^0^1^0^0^0^1^" , "StopsperWeek":"0.750000"  , "WeeklySumOfCaseEquiv":"0.667"  , "WeeklySumOfCases":"0.667"  , "OSEQ":"1005"  , "OnPremise":"True"  , "DraftPackage":"3"  , "CustomerDuration":24.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"220.4"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "2365"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "13"  , "OldPhase":"13"  , "Sequence":"1005"  , "OldSequence":"1005"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"2354"  , "CustomerID":"2700"  , "Seq":"1023"  , "UserName":"ELAINES"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Elaines Place"  , "Address":"17590 Co Rd T5"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.2502582"  , "Longitude":"-103.7999509"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^0^0^0^0^0^0^0^0^0^0^0^0^" , "StopsperWeek":"0.750000"  , "WeeklySumOfCaseEquiv":"0"  , "WeeklySumOfCases":"0"  , "OSEQ":"1023"  , "OnPremise":"True"  , "DraftPackage":"3"  , "CustomerDuration":0.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"0"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "2354"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "13"  , "OldPhase":"13"  , "Sequence":"1023"  , "OldSequence":"1023"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"2360"  , "CustomerID":"1565"  , "Seq":"1045"  , "UserName":"AMLEGFM"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"American Legion-Ft Morgan"  , "Address":"16913 Cr 17.7"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80751"  , "Latitude":"40.25397"  , "Longitude":"-103.792075"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^3^0^0^0^3^0^0^0^0^0^0^0^" , "StopsperWeek":"0.500000"  , "WeeklySumOfCaseEquiv":"0.25"  , "WeeklySumOfCases":"0.25"  , "OSEQ":"1045"  , "OnPremise":"True"  , "DraftPackage":"3"  , "CustomerDuration":9.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"77.45"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "2360"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "3"  , "OldPhase":"3"  , "Sequence":"1045"  , "OldSequence":"1045"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"7809"  , "CustomerID":"759"  , "Seq":"1108"  , "UserName":"MAVERIK#480"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Maverik #480 (Morgan)"  , "Address":"1206 Main Street"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.261329"  , "Longitude":"-103.8014665"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"80^0^669^0^0^0^749^7^0^56^0^0^0^63^" , "StopsperWeek":"2.000000"  , "WeeklySumOfCaseEquiv":"70.569"  , "WeeklySumOfCases":"62.417"  , "OSEQ":"1108"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":2247.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"22406.5"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "7809"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"1108"  , "OldSequence":"1108"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"2337"  , "CustomerID":"4912"  , "Seq":"1120"  , "UserName":"WONDHSE-FTMO"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Wonderful House-Ft Morgn"  , "Address":"629 Main Street"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.254667"  , "Longitude":"-103.801509"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^2^0^0^0^2^0^0^0^0^0^0^0^" , "StopsperWeek":"0.750000"  , "WeeklySumOfCaseEquiv":"0.167"  , "WeeklySumOfCases":"0.167"  , "OSEQ":"1120"  , "OnPremise":"True"  , "DraftPackage":"2"  , "CustomerDuration":6.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"54.8"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "2337"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "13"  , "OldPhase":"13"  , "Sequence":"1120"  , "OldSequence":"1120"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"6781"  , "CustomerID":"1701"  , "Seq":"1147"  , "UserName":"WALMT-FTM"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Wal-Mart #5033 Ft Morgan"  , "Address":"1300 Barlow Rd"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.2654858"  , "Longitude":"-103.7726681"  , "WarehouseByStopDistance":72.752  , "NumUnitsStr":"39^0^2285^0^0^0^2324^3^0^190^0^0^0^193^" , "StopsperWeek":"3.000000"  , "WeeklySumOfCaseEquiv":"202.958"  , "WeeklySumOfCases":"193.667"  , "OSEQ":"1147"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":6972.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"35729.52"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "6781"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"1147"  , "OldSequence":"1147"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"2339"  , "CustomerID":"1720"  , "Seq":"1315"  , "UserName":"711FMW"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"7-11 Morgan W. 15431"  , "Address":"603 W. Platte Ave."  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.2541031"  , "Longitude":"-103.8095126"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"7^0^177^0^0^0^184^1^0^15^0^0^0^16^" , "StopsperWeek":"1.500000"  , "WeeklySumOfCaseEquiv":"19.725"  , "WeeklySumOfCases":"15.333"  , "OSEQ":"1315"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":551.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"6210.62"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "2339"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"1315"  , "OldSequence":"1315"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"2335"  , "CustomerID":"1993"  , "Seq":"1339"  , "UserName":"LITTLEBA"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Little Bamboo"  , "Address":"613 W Platte"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.2540295"  , "Longitude":"-103.8096314"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^4^0^0^0^4^0^0^0^0^0^0^0^" , "StopsperWeek":"0.750000"  , "WeeklySumOfCaseEquiv":"0.333"  , "WeeklySumOfCases":"0.333"  , "OSEQ":"1339"  , "OnPremise":"True"  , "DraftPackage":"2"  , "CustomerDuration":11.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"108.8"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "2335"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "13"  , "OldPhase":"13"  , "Sequence":"1339"  , "OldSequence":"1339"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"8624"  , "CustomerID":"912"  , "Seq":"1342"  , "UserName":"MORGANLANES"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Morgan Lanes"  , "Address":"300 E Railroad Ave."  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701-3137"  , "Latitude":"40.2484848350286"  , "Longitude":"-103.798320516944"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^2^24^0^0^0^26^0^0^2^0^0^0^2^" , "StopsperWeek":"1.250000"  , "WeeklySumOfCaseEquiv":"2.383"  , "WeeklySumOfCases":"2.167"  , "OSEQ":"1342"  , "OnPremise":"True"  , "DraftPackage":"2"  , "CustomerDuration":78.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"825.2"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "8624"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"1342"  , "OldSequence":"1342"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"6780"  , "CustomerID":"1700"  , "Seq":"1353"  , "UserName":"SAFWY_FM"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Safeway #2341"  , "Address":"620 W. Platte Ave."  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.25332161994244"  , "Longitude":"-103.80980394603272"  , "WarehouseByStopDistance":76.925  , "NumUnitsStr":"15^0^2088^0^0^0^2103^1^0^174^0^0^0^175^" , "StopsperWeek":"3.000000"  , "WeeklySumOfCaseEquiv":"195.33"  , "WeeklySumOfCases":"175.25"  , "OSEQ":"1353"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":6309.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"27033.62"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "6780"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"1353"  , "OldSequence":"1353"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"2370"  , "CustomerID":"1496"  , "Seq":"1354"  , "UserName":"OSOLE"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Osole Mio"  , "Address":"322 Ensign"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.2501753"  , "Longitude":"-103.8027384"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^2^3^0^0^0^5^0^0^0^0^0^0^0^" , "StopsperWeek":"0.750000"  , "WeeklySumOfCaseEquiv":"0.824"  , "WeeklySumOfCases":"0.417"  , "OSEQ":"1354"  , "OnPremise":"True"  , "DraftPackage":"2"  , "CustomerDuration":15.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"314.8"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "2370"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "24"  , "OldPhase":"24"  , "Sequence":"1354"  , "OldSequence":"1354"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"2329"  , "CustomerID":"1016"  , "Seq":"1404"  , "UserName":"ACAPULCO"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Acapulco Bay Corp"  , "Address":"204 Main Street"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701-2107"  , "Latitude":"40.2485455"  , "Longitude":"-103.8014892"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^13^0^0^0^13^0^0^1^0^0^0^1^" , "StopsperWeek":"0.750000"  , "WeeklySumOfCaseEquiv":"1.049"  , "WeeklySumOfCases":"1.083"  , "OSEQ":"1404"  , "OnPremise":"True"  , "DraftPackage":"3"  , "CustomerDuration":38.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"338"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "2329"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "13"  , "OldPhase":"13"  , "Sequence":"1404"  , "OldSequence":"1404"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"6758"  , "CustomerID":"118"  , "Seq":"1423"  , "UserName":"WALGREEN-FTM"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Walgreens 09979 (Morgan)Vendor #001208144"  , "Address":"111 Platte Ave"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80654"  , "Latitude":"40.254096805284924"  , "Longitude":"-103.80128404841004"  , "WarehouseByStopDistance":76.201  , "NumUnitsStr":"21^0^157^0^0^0^177^2^0^13^0^0^0^15^" , "StopsperWeek":"1.500000"  , "WeeklySumOfCaseEquiv":"17.038"  , "WeeklySumOfCases":"14.792"  , "OSEQ":"1423"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":532.500012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"3576.71"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "6758"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"1423"  , "OldSequence":"1423"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"6876"  , "CustomerID":"1745"  , "Seq":"1424"  , "UserName":"SSHERMAN"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"S Sherman"  , "Address":"207 S. Sherman"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.2457157"  , "Longitude":"-103.79204830000003"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^99^0^0^0^99^0^0^8^0^0^0^8^" , "StopsperWeek":"1.500000"  , "WeeklySumOfCaseEquiv":"9.943"  , "WeeklySumOfCases":"8.25"  , "OSEQ":"1424"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":297.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"3973.8"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "6876"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"1424"  , "OldSequence":"1424"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"2362"  , "CustomerID":"80"  , "Seq":"1438"  , "UserName":"CON_CONV"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Conoco Conv. Ft Morgan"  , "Address":"1300 Main"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.2624728"  , "Longitude":"-103.8013046"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^68^0^0^0^68^0^0^6^0^0^0^6^" , "StopsperWeek":"1.250000"  , "WeeklySumOfCaseEquiv":"6.237"  , "WeeklySumOfCases":"5.667"  , "OSEQ":"1438"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":204.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"2513"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "2362"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"1438"  , "OldSequence":"1438"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"2338"  , "CustomerID":"1710"  , "Seq":"1450"  , "UserName":"711FME"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"7-11 Morgan E. 15203"  , "Address":"705 E. Platte Ave."  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.2539858"  , "Longitude":"-103.7919669"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"10^0^196^0^0^0^206^1^0^16^0^0^0^17^" , "StopsperWeek":"4.000000"  , "WeeklySumOfCaseEquiv":"21.399"  , "WeeklySumOfCases":"17.167"  , "OSEQ":"1450"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":618.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"7163.77"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "2338"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"1450"  , "OldSequence":"1450"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"8638"  , "CustomerID":"924"  , "Seq":"1507"  , "UserName":"BRAD_2"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Bradley Petroleum"  , "Address":"601 Main St"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.2541174739599"  , "Longitude":"-103.801547884941"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^26^0^0^0^26^0^0^2^0^0^0^2^" , "StopsperWeek":"1.250000"  , "WeeklySumOfCaseEquiv":"2.724"  , "WeeklySumOfCases":"2.167"  , "OSEQ":"1507"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":78.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"1115.4"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "8638"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"1507"  , "OldSequence":"1507"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"285"  , "CustomerID":"1530"  , "Seq":"1525"  , "UserName":"EDWARDS"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Edwards Right Price Mkt"  , "Address":"1201 E Platte Ave"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.254284295213395"  , "Longitude":"-103.7868225330658"  , "WarehouseByStopDistance":74.787  , "NumUnitsStr":"5^0^365^0^0^0^370^0^0^30^0^0^0^30^" , "StopsperWeek":"1.500000"  , "WeeklySumOfCaseEquiv":"34.673"  , "WeeklySumOfCases":"30.833"  , "OSEQ":"1525"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":1109.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"6043.22"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "285"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"1525"  , "OldSequence":"1525"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"6746"  , "CustomerID":"1330"  , "Seq":"1610"  , "UserName":"BRUSHGK"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Brush Grocery Kart #552"  , "Address":"1302 W Edison Street"  , "City":"Brush"  , "State":"CO"  , "PostalCode":"80723"  , "Latitude":"40.254300113139344"  , "Longitude":"-103.6381232661316"  , "WarehouseByStopDistance":63.162  , "NumUnitsStr":"8^0^688^0^0^0^696^1^0^57^0^0^0^58^" , "StopsperWeek":"2.000000"  , "WeeklySumOfCaseEquiv":"62.408"  , "WeeklySumOfCases":"58"  , "OSEQ":"1610"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":2088.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"8603.9"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "6746"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"1610"  , "OldSequence":"1610"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"497"  , "CustomerID":"1310"  , "Seq":"1626"  , "UserName":"711BRSH"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"7-11 Brush 15955"  , "Address":"620 Edison"  , "City":"Brush"  , "State":"CO"  , "PostalCode":"80723"  , "Latitude":"40.2552537"  , "Longitude":"-103.6260549"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"7^0^133^0^0^0^140^1^0^11^0^0^0^12^" , "StopsperWeek":"4.000000"  , "WeeklySumOfCaseEquiv":"14.952"  , "WeeklySumOfCases":"11.667"  , "OSEQ":"1626"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":420.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"4688.9"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "497"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"1626"  , "OldSequence":"1626"  , "OldRouteID":"130" } ] }
//                 ,
//                 {
//                   "StopID":"7622"  , "CustomerID":"139"  , "Seq":"1644"  , "UserName":"DG-MORGAN"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Dollar General #10873 Ft Morgan"  , "Address":"522 Warner St"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.2532763"  , "Longitude":"-103.7905742"  , "WarehouseByStopDistance":75.183  , "NumUnitsStr":"0^0^43^0^0^0^43^0^0^4^0^0^0^4^" , "StopsperWeek":"1.500000"  , "WeeklySumOfCaseEquiv":"4.698"  , "WeeklySumOfCases":"3.583"  , "OSEQ":"1644"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":128.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"1069.78"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "7622"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"1644"  , "OldSequence":"1644"  , "OldRouteID":"130" } ] }
//               ]
//             },
//             {
//               "RouteID":"20"  , "PickTypes":"*^KEG^PKG^Z^SODA^Cans^Total^* per Week^KEG per Week^PKG per Week^Z per Week^SODA per Week^Cans per Week^Total per Week"
//               , "RouteNum":"102"  , "Route":"102 Tues Morgan"  , "RouteVersionID":"1"  , "RouteVersion":"A"  , "Deliveryman":"TREY"  , "Activity":"Delivery"  , "NextDate":"4/7/2015"  , "CostPerMile":"0.74"  , "RouteFrequency":1  , "DeliveryDay":"Tuesday"  , "StartTime":"6:00 AM"  , "OldEndTime":"4:00 PM"  , "EndTime":"0"
//               , "Duration":0
//               , "PlannedDistance":0.000000 , "StartMapPointID":"1"  , "EndMapPointID":"1"  , "Color":"EE8262"  , "Latitude":"40.624517"  , "Longitude":"-103.284469"  , "LocationID":"1"  , "Address":"15611 Tanya St,"  , "City":"Sterling"  , "State":"CO"  , "PostalCode":"80751"  , "Stops":
//               [
//                 {
//                   "StopID":"8659"  , "CustomerID":"941"  , "Seq":"0"  , "UserName":"FAMILYDO"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Family Dollar (Morgan)"  , "Address":"1000 E Platte Ave, Unit B"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.2539800107479"  , "Longitude":"-103.787975236773"  , "WarehouseByStopDistance":74.885  , "NumUnitsStr":"0^0^63^0^0^0^63^0^0^5^0^0^0^5^" , "StopsperWeek":"1.250000"  , "WeeklySumOfCaseEquiv":"7.285"  , "WeeklySumOfCases":"5.25"  , "OSEQ":"0"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":189.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"638.34"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "8659"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"0"  , "OldSequence":"0"  , "OldRouteID":"20" } ] }
//                 ,
//                 {
//                   "StopID":"7080"  , "CustomerID":"267"  , "Seq":"0"  , "UserName":"Longmeadow"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Longmeadow Game Resort Event Center"  , "Address":"8604 County Rd. 6"  , "City":"Wiggins"  , "State":"CO"  , "PostalCode":"80654"  , "Latitude":"40.1257537"  , "Longitude":"-104.03751829999999"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^11^0^0^0^11^0^0^1^0^0^0^1^" , "StopsperWeek":"0.750000"  , "WeeklySumOfCaseEquiv":"0.917"  , "WeeklySumOfCases":"0.917"  , "OSEQ":"0"  , "OnPremise":"True"  , "DraftPackage":"2"  , "CustomerDuration":33.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"294.65"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "7080"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "24"  , "OldPhase":"24"  , "Sequence":"0"  , "OldSequence":"0"  , "OldRouteID":"20" } ] }
//                 ,
//                 {
//                   "StopID":"8655"  , "CustomerID":"937"  , "Seq":"0"  , "UserName":"LOUIE"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Louies Liquor"  , "Address":"400 West Central Ave."  , "City":"Wiggins"  , "State":"CO"  , "PostalCode":"80654"  , "Latitude":"40.2323989868164"  , "Longitude":"-104.072151184082"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^199^0^0^0^199^0^0^17^0^0^0^17^" , "StopsperWeek":"1.500000"  , "WeeklySumOfCaseEquiv":"17.34"  , "WeeklySumOfCases":"16.58"  , "OSEQ":"0"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":596.874996000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"5167.59"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "8655"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"0"  , "OldSequence":"0"  , "OldRouteID":"20" } ] }
//                 ,
//                 {
//                   "StopID":"291"  , "CustomerID":"1781"  , "Seq":"0"  , "UserName":"VILLAGE"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Village Liquor Store"  , "Address":"631 W Platte Ave"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.2540206"  , "Longitude":"-103.80999689999999"  , "WarehouseByStopDistance":76.905  , "NumUnitsStr":"0^0^1507^0^0^0^1507^0^0^126^0^0^0^126^" , "StopsperWeek":"3.000000"  , "WeeklySumOfCaseEquiv":"125.902"  , "WeeklySumOfCases":"125.583"  , "OSEQ":"0"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":4520.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"33712.75"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "291"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"0"  , "OldSequence":"0"  , "OldRouteID":"20" } ] }
//                 ,
//                 {
//                   "StopID":"8622"  , "CustomerID":"911"  , "Seq":"0"  , "UserName":"WIGGINSUPER"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Wiggins Supers"  , "Address":"P.O. Box 87"  , "City":"Wiggins"  , "State":"CO"  , "PostalCode":"80654"  , "Latitude":"40.2330602"  , "Longitude":"-104.074431"  , "WarehouseByStopDistance":100.735  , "NumUnitsStr":"5^0^187^0^0^0^192^0^0^16^0^0^0^16^" , "StopsperWeek":"1.500000"  , "WeeklySumOfCaseEquiv":"17.801"  , "WeeklySumOfCases":"16"  , "OSEQ":"0"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":576.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"3578.7"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "8622"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"0"  , "OldSequence":"0"  , "OldRouteID":"20" } ] }
//                 ,
//                 {
//                   "StopID":"6975"  , "CustomerID":"199"  , "Seq":"7"  , "UserName":"JACAL"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Jacal Mexican Resturant"  , "Address":"105 8th Avenue"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.258106"  , "Longitude":"-103.8014555"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^80^0^0^0^80^0^0^7^0^0^0^7^" , "StopsperWeek":"1.250000"  , "WeeklySumOfCaseEquiv":"6.667"  , "WeeklySumOfCases":"6.667"  , "OSEQ":"7"  , "OnPremise":"True"  , "DraftPackage":"3"  , "CustomerDuration":240.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"2156"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "6975"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"7"  , "OldSequence":"7"  , "OldRouteID":"20" } ] }
//                 ,
//                 {
//                   "StopID":"284"  , "CustomerID":"1520"  , "Seq":"8"  , "UserName":"EASTPLAT"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"East Platte Ave Liquor"  , "Address":"19309 E Platte Ave"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.25429554181963"  , "Longitude":"-103.78612464666365"  , "WarehouseByStopDistance":74.729  , "NumUnitsStr":"0^2^3342^0^0^0^3344^0^0^278^0^0^0^278^" , "StopsperWeek":"3.000000"  , "WeeklySumOfCaseEquiv":"276.485"  , "WeeklySumOfCases":"278.667"  , "OSEQ":"8"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":10032.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"70448.98"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "284"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"8"  , "OldSequence":"8"  , "OldRouteID":"20" } ] }
//                 ,
//                 {
//                   "StopID":"6905"  , "CustomerID":"164"  , "Seq":"11"  , "UserName":"WIGSJUNCLIQ"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Wiggins Junction Liquor"  , "Address":"17104 HWY 39"  , "City":"Wiggins"  , "State":"CO"  , "PostalCode":"80654"  , "Latitude":"40.24688843725261"  , "Longitude":"-104.05524467773438"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^0^0^0^0^0^0^0^0^0^0^0^0^" , "StopsperWeek":"1.250000"  , "WeeklySumOfCaseEquiv":"0"  , "WeeklySumOfCases":"0"  , "OSEQ":"11"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":0.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"0"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "6905"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"11"  , "OldSequence":"11"  , "OldRouteID":"20" } ] }
//                 ,
//                 {
//                   "StopID":"6771"  , "CustomerID":"2745"  , "Seq":"12"  , "UserName":"WIGJUNCT"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Wiggins Junction"  , "Address":"17104 Hwy 39"  , "City":"Wiggins"  , "State":"CO"  , "PostalCode":"80654"  , "Latitude":"40.2494872"  , "Longitude":"-104.0557988"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^0^0^0^0^0^0^0^0^0^0^0^0^" , "StopsperWeek":"1.250000"  , "WeeklySumOfCaseEquiv":"0"  , "WeeklySumOfCases":"0"  , "OSEQ":"12"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":0.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"0"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "6771"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"12"  , "OldSequence":"12"  , "OldRouteID":"20" } ] }
//                 ,
//                 {
//                   "StopID":"2196"  , "CustomerID":"2760"  , "Seq":"13"  , "UserName":"STUBSLIQ"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Stubs Liquor"  , "Address":"16740 Hwy 39"  , "City":"Wiggins"  , "State":"CO"  , "PostalCode":"80654"  , "Latitude":"40.24413731518268"  , "Longitude":"-104.05554323356628"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^781^0^0^0^781^0^0^65^0^0^0^65^" , "StopsperWeek":"2.000000"  , "WeeklySumOfCaseEquiv":"64.548"  , "WeeklySumOfCases":"65.083"  , "OSEQ":"13"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":2342.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"17569.6"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "2196"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"13"  , "OldSequence":"13"  , "OldRouteID":"20" } ] }
//                 ,
//                 {
//                   "StopID":"6757"  , "CustomerID":"2750"  , "Seq":"14"  , "UserName":"STUBSGAS"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Stubs Gas and Oil Inc."  , "Address":"16740 Hwy 39"  , "City":"Wiggins"  , "State":"CO"  , "PostalCode":"80654"  , "Latitude":"40.2440698"  , "Longitude":"-104.0554452"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^211^0^0^0^211^0^0^18^0^0^0^18^" , "StopsperWeek":"1.500000"  , "WeeklySumOfCaseEquiv":"20.937"  , "WeeklySumOfCases":"17.583"  , "OSEQ":"14"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":632.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"7810.4"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "6757"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"14"  , "OldSequence":"14"  , "OldRouteID":"20" } ] }
//                 ,
//                 {
//                   "StopID":"513"  , "CustomerID":"1068"  , "Seq":"16"  , "UserName":"willow"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Willow\u0027s Farmhouse Grille"  , "Address":"109 Colorado Ave"  , "City":"Merino"  , "State":"CO"  , "PostalCode":"80741"  , "Latitude":"40.482832"  , "Longitude":"-103.352306"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^59^0^0^0^59^0^0^5^0^0^0^5^" , "StopsperWeek":"1.250000"  , "WeeklySumOfCaseEquiv":"4.917"  , "WeeklySumOfCases":"4.917"  , "OSEQ":"16"  , "OnPremise":"True"  , "DraftPackage":"3"  , "CustomerDuration":177.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"1396.8"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "513"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"16"  , "OldSequence":"16"  , "OldRouteID":"20" } ] }
//                 ,
//                 {
//                   "StopID":"287"  , "CustomerID":"1630"  , "Seq":"836"  , "UserName":"NMAIN"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"North Main Liquor"  , "Address":"716 North Main Street"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.2556021"  , "Longitude":"-103.8014741"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^794^0^0^0^794^0^0^66^0^0^0^66^" , "StopsperWeek":"2.000000"  , "WeeklySumOfCaseEquiv":"66.182"  , "WeeklySumOfCases":"66.167"  , "OSEQ":"836"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":2382.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"18684.4"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "287"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"836"  , "OldSequence":"836"  , "OldRouteID":"20" } ] }
//                 ,
//                 {
//                   "StopID":"6970"  , "CustomerID":"193"  , "Seq":"839"  , "UserName":"LILGREENEYS"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Lil Greeneys Liquor"  , "Address":"129 Maine Street"  , "City":"Log Lane Village"  , "State":"CO"  , "PostalCode":"80705"  , "Latitude":"40.2703201"  , "Longitude":"-103.8320292"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^321^0^0^0^321^0^0^27^0^0^0^27^" , "StopsperWeek":"1.500000"  , "WeeklySumOfCaseEquiv":"26.675"  , "WeeklySumOfCases":"26.75"  , "OSEQ":"839"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":963.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"7081.65"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "6970"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"839"  , "OldSequence":"839"  , "OldRouteID":"20" } ] }
//                 ,
//                 {
//                   "StopID":"302"  , "CustomerID":"1680"  , "Seq":"915"  , "UserName":"QUEENS"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Queen Lounge"  , "Address":"112 W Kiowa Ave"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.2498356"  , "Longitude":"-103.8016381"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^115^0^0^0^115^0^0^10^0^0^0^10^" , "StopsperWeek":"1.500000"  , "WeeklySumOfCaseEquiv":"9.583"  , "WeeklySumOfCases":"9.583"  , "OSEQ":"915"  , "OnPremise":"True"  , "DraftPackage":"2"  , "CustomerDuration":344.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"3118"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "302"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"915"  , "OldSequence":"915"  , "OldRouteID":"20" } ] }
//                 ,
//                 {
//                   "StopID":"2361"  , "CustomerID":"1500"  , "Seq":"1005"  , "UserName":"CLUBTAP"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Club Tap Room"  , "Address":"212 Main Street"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.2486553"  , "Longitude":"-103.8014885"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^2^57^0^0^0^59^0^0^5^0^0^0^5^" , "StopsperWeek":"1.250000"  , "WeeklySumOfCaseEquiv":"5.898"  , "WeeklySumOfCases":"4.917"  , "OSEQ":"1005"  , "OnPremise":"True"  , "DraftPackage":"2"  , "CustomerDuration":177.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"1725.25"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "2361"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"1005"  , "OldSequence":"1005"  , "OldRouteID":"20" } ] }
//                 ,
//                 {
//                   "StopID":"2372"  , "CustomerID":"1760"  , "Seq":"1028"  , "UserName":"VFWFM"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"VFW-Ft Morgan"  , "Address":"208 Beaver Ave"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.2512271"  , "Longitude":"-103.799902"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^91^0^0^0^91^0^0^8^0^0^0^8^" , "StopsperWeek":"0.750000"  , "WeeklySumOfCaseEquiv":"7.583"  , "WeeklySumOfCases":"7.583"  , "OSEQ":"1028"  , "OnPremise":"True"  , "DraftPackage":"3"  , "CustomerDuration":272.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"2455.25"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "2372"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "13"  , "OldPhase":"13"  , "Sequence":"1028"  , "OldSequence":"1028"  , "OldRouteID":"20" } ] }
//                 ,
//                 {
//                   "StopID":"7573"  , "CustomerID":"198"  , "Seq":"1130"  , "UserName":"MightyMart"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Mighty Mart"  , "Address":"1424 Highway 34"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.2549078"  , "Longitude":"-103.6368842"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^78^0^0^0^78^0^0^6^0^0^0^6^" , "StopsperWeek":"1.250000"  , "WeeklySumOfCaseEquiv":"7.616"  , "WeeklySumOfCases":"6.5"  , "OSEQ":"1130"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":234.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"3053.2"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "7573"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"1130"  , "OldSequence":"1130"  , "OldRouteID":"20" } ] }
//                 ,
//                 {
//                   "StopID":"7564"  , "CustomerID":"565"  , "Seq":"1259"  , "UserName":"WAYWARD"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Wayward Wind Liquor"  , "Address":"1424 Highway 34"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.2549078"  , "Longitude":"-103.6368842"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^223^0^0^0^223^0^0^19^0^0^0^19^" , "StopsperWeek":"1.500000"  , "WeeklySumOfCaseEquiv":"18.201"  , "WeeklySumOfCases":"18.583"  , "OSEQ":"1259"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":668.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"5297.65"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "7564"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"1259"  , "OldSequence":"1259"  , "OldRouteID":"20" } ] }
//                 ,
//                 {
//                   "StopID":"8650"  , "CustomerID":"934"  , "Seq":"1342"  , "UserName":"LOGLANEGAS"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Log Lane Food Gas"  , "Address":"130 Main Street"  , "City":"Log Lane Village"  , "State":"CO"  , "PostalCode":"80705"  , "Latitude":"40.2699981629848"  , "Longitude":"-103.833199292421"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^37^0^0^0^37^0^0^3^0^0^0^3^" , "StopsperWeek":"1.250000"  , "WeeklySumOfCaseEquiv":"3.792"  , "WeeklySumOfCases":"3.083"  , "OSEQ":"1342"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":110.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"1512.3"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "8650"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"1342"  , "OldSequence":"1342"  , "OldRouteID":"20" } ] }
//                 ,
//                 {
//                   "StopID":"7812"  , "CustomerID":"580"  , "Seq":"1446"  , "UserName":"JOVIS"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"JOVI\u0027S LIQUOR"  , "Address":"625 E. BURLINGTON"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.2467841"  , "Longitude":"-103.79326789999999"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^137^0^0^0^137^0^0^11^0^0^0^11^" , "StopsperWeek":"1.250000"  , "WeeklySumOfCaseEquiv":"11.014"  , "WeeklySumOfCases":"11.417"  , "OSEQ":"1446"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":411.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"3135.35"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "7812"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"1446"  , "OldSequence":"1446"  , "OldRouteID":"20" } ] }
//                 ,
//                 {
//                   "StopID":"294"  , "CustomerID":"1495"  , "Seq":"1503"  , "UserName":"CABLES"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Cables Italian Grille"  , "Address":"431 Main Street"  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.2516711"  , "Longitude":"-103.8015134"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^11^59^0^0^0^70^0^1^5^0^0^0^6^" , "StopsperWeek":"1.500000"  , "WeeklySumOfCaseEquiv":"11.218"  , "WeeklySumOfCases":"5.833"  , "OSEQ":"1503"  , "OnPremise":"True"  , "DraftPackage":"2"  , "CustomerDuration":209.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"3231.15"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "294"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"1503"  , "OldSequence":"1503"  , "OldRouteID":"20" } ] }
//                 ,
//                 {
//                   "StopID":"8687"  , "CustomerID":"963"  , "Seq":"1613"  , "UserName":"CASAPATRON"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":""  , "Company":"Casa Patron"  , "Address":"1215 W. Platte Ave."  , "City":"Fort Morgan"  , "State":"CO"  , "PostalCode":"80701"  , "Latitude":"40.2544288635254"  , "Longitude":"-103.816841125488"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^59^0^0^0^59^0^0^5^0^0^0^5^" , "StopsperWeek":"1.250000"  , "WeeklySumOfCaseEquiv":"4.674"  , "WeeklySumOfCases":"4.917"  , "OSEQ":"1613"  , "OnPremise":"True"  , "DraftPackage":"3"  , "CustomerDuration":177.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"1515.85"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "8687"  , "Activity": "Delivery"  , "StopActivity":""  , "Phase": "All"  , "OldPhase":"All"  , "Sequence":"1613"  , "OldSequence":"1613"  , "OldRouteID":"20" } ] }
//               ]
//             },
//             {
//               "RouteID":"890"  , "PickTypes":"*^KEG^PKG^Z^SODA^Cans^Total^* per Week^KEG per Week^PKG per Week^Z per Week^SODA per Week^Cans per Week^Total per Week"
//               , "RouteNum":"2000"  , "Route":"2000 Tue"  , "RouteVersionID":"1"  , "RouteVersion":"A"  , "Deliveryman":"Ann"  , "Activity":"Delivery"  , "NextDate":""  , "CostPerMile":"1.50"  , "RouteFrequency":1  , "DeliveryDay":""  , "StartTime":"6:00 AM"  , "OldEndTime":"7:00 PM"  , "EndTime":"0"
//               , "Duration":0
//               , "PlannedDistance":0.000000 , "StartMapPointID":"1"  , "EndMapPointID":"1"  , "Color":"4682B4"  , "Latitude":"40.624517"  , "Longitude":"-103.284469"  , "LocationID":"1"  , "Address":"15611 Tanya St,"  , "City":"Sterling"  , "State":"CO"  , "PostalCode":"80751"  , "Stops":
//               [
//                 {
//                   "StopID":"13947"  , "CustomerID":"827"  , "Seq":"1"  , "UserName":"SANDY1"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":"Delivery"  , "Company":"Sandy\u0027s #1"  , "Address":"1500 E. Mulberry"  , "City":"Fort Collins"  , "State":"CO"  , "PostalCode":"80524"  , "Latitude":"40.5819446"  , "Longitude":"-105.04978770000002"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^0^0^0^0^0^0^0^0^0^0^0^0^" , "StopsperWeek":"0.250000"  , "WeeklySumOfCaseEquiv":"0"  , "WeeklySumOfCases":"0"  , "OSEQ":"1"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":0.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"0"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "13947"  , "Activity": "Delivery"  , "StopActivity":"Delivery"  , "Phase": "2"  , "OldPhase":"2"  , "Sequence":"1"  , "OldSequence":"1"  , "OldRouteID":"890" } ] }
//                 ,
//                 {
//                   "StopID":"13949"  , "CustomerID":"779"  , "Seq":"2"  , "UserName":"SMOKEYMONK"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":"Delivery"  , "Company":"Smokey Monkey"  , "Address":"1232 E Elizabeth Unit C-12"  , "City":"Fort Collins"  , "State":"CO"  , "PostalCode":"80521"  , "Latitude":"40.5742323"  , "Longitude":"-105.05437069999999"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^0^0^0^0^0^0^0^0^0^0^0^0^" , "StopsperWeek":"0.250000"  , "WeeklySumOfCaseEquiv":"0"  , "WeeklySumOfCases":"0"  , "OSEQ":"2"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":0.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"0"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "13949"  , "Activity": "Delivery"  , "StopActivity":"Delivery"  , "Phase": "1"  , "OldPhase":"1"  , "Sequence":"2"  , "OldSequence":"2"  , "OldRouteID":"890" } ] }
//                 ,
//                 {
//                   "StopID":"13951"  , "CustomerID":"1132"  , "Seq":"3"  , "UserName":"Jonathan"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":"Delivery"  , "Company":"Jonathan Oneil"  , "Address":"2937 Eastborough Dr"  , "City":"Ft Collins"  , "State":"CO"  , "PostalCode":"80525"  , "Latitude":"40.547336"  , "Longitude":"-105.057526"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^0^0^0^0^0^0^0^0^0^0^0^0^" , "StopsperWeek":"0.250000"  , "WeeklySumOfCaseEquiv":"0"  , "WeeklySumOfCases":"0"  , "OSEQ":"3"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":0.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"0"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "13951"  , "Activity": "Delivery"  , "StopActivity":"Delivery"  , "Phase": "3"  , "OldPhase":"3"  , "Sequence":"3"  , "OldSequence":"3"  , "OldRouteID":"890" } ] }
//                 ,
//                 {
//                   "StopID":"13953"  , "CustomerID":"776"  , "Seq":"4"  , "UserName":"LAZYJ"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":"Delivery"  , "Company":"Lazy J\u0027s"  , "Address":"1700 S College Unit D"  , "City":"Fort Collins"  , "State":"CO"  , "PostalCode":"80525"  , "Latitude":"40.559352"  , "Longitude":"-105.08419939999999"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^0^0^0^0^0^0^0^0^0^0^0^0^" , "StopsperWeek":"0.250000"  , "WeeklySumOfCaseEquiv":"0"  , "WeeklySumOfCases":"0"  , "OSEQ":"4"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":0.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"0"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "13953"  , "Activity": "Delivery"  , "StopActivity":"Delivery"  , "Phase": "2"  , "OldPhase":"2"  , "Sequence":"4"  , "OldSequence":"4"  , "OldRouteID":"890" } ] }
//                 ,
//                 {
//                   "StopID":"13955"  , "CustomerID":"793"  , "Seq":"5"  , "UserName":"GETITGO"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":"Delivery"  , "Company":"Get It and Go"  , "Address":"1005 West Stuart St."  , "City":"Fort Collins"  , "State":"CO"  , "PostalCode":"80526"  , "Latitude":"40.5636049"  , "Longitude":"-105.09605190000002"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^0^0^0^0^0^0^0^0^0^0^0^0^" , "StopsperWeek":"0.250000"  , "WeeklySumOfCaseEquiv":"0"  , "WeeklySumOfCases":"0"  , "OSEQ":"5"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":0.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"0"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "13955"  , "Activity": "Delivery"  , "StopActivity":"Delivery"  , "Phase": "3"  , "OldPhase":"3"  , "Sequence":"5"  , "OldSequence":"5"  , "OldRouteID":"890" } ] }
//                 ,
//                 {
//                   "StopID":"13957"  , "CustomerID":"828"  , "Seq":"6"  , "UserName":"OLDTOWN_2"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":"Delivery"  , "Company":"Old Town Liquor"  , "Address":"214 S. College Unit 1"  , "City":"Fort Collins"  , "State":"CO"  , "PostalCode":"80524"  , "Latitude":"40.584905"  , "Longitude":"-105.07652999999999"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^0^0^0^0^0^0^0^0^0^0^0^0^" , "StopsperWeek":"0.250000"  , "WeeklySumOfCaseEquiv":"0"  , "WeeklySumOfCases":"0"  , "OSEQ":"6"  , "OnPremise":"False"  , "DraftPackage":"1"  , "CustomerDuration":0.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"0"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "13957"  , "Activity": "Delivery"  , "StopActivity":"Delivery"  , "Phase": "3"  , "OldPhase":"3"  , "Sequence":"6"  , "OldSequence":"6"  , "OldRouteID":"890" } ] }
//                 ,
//                 {
//                   "StopID":"13959"  , "CustomerID":"774"  , "Seq":"7"  , "UserName":"UPINSMOKE"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":"Delivery"  , "Company":"Up in Smoke"  , "Address":"272 a North College Ave"  , "City":"Fort Collins"  , "State":"CO"  , "PostalCode":"80524"  , "Latitude":"40.5904905"  , "Longitude":"-105.07663600000001"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^0^0^0^0^0^0^0^0^0^0^0^0^" , "StopsperWeek":"0.250000"  , "WeeklySumOfCaseEquiv":"0"  , "WeeklySumOfCases":"0"  , "OSEQ":"7"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":0.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"0"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "13959"  , "Activity": "Delivery"  , "StopActivity":"Delivery"  , "Phase": "1"  , "OldPhase":"1"  , "Sequence":"7"  , "OldSequence":"7"  , "OldRouteID":"890" } ] }
//                 ,
//                 {
//                   "StopID":"13961"  , "CustomerID":"764"  , "Seq":"8"  , "UserName":"Encompass"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":"Delivery"  , "Company":"Encompass Technologies"  , "Address":"420 Linden Street, Suite 200"  , "City":"Fort Collins"  , "State":"CO"  , "PostalCode":"80524"  , "Latitude":"40.5887117"  , "Longitude":"-105.07333419999998"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^116^0^0^0^116^0^0^10^0^0^0^10^" , "StopsperWeek":"0.250000"  , "WeeklySumOfCaseEquiv":"10"  , "WeeklySumOfCases":"9.667"  , "OSEQ":"8"  , "OnPremise":"True"  , "DraftPackage":"2"  , "CustomerDuration":348.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"1608.25"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "13961"  , "Activity": "Delivery"  , "StopActivity":"Delivery"  , "Phase": "4"  , "OldPhase":"4"  , "Sequence":"8"  , "OldSequence":"8"  , "OldRouteID":"890" } ] }
//                 ,
//                 {
//                   "StopID":"13963"  , "CustomerID":"1048"  , "Seq":"9"  , "UserName":"OdellBrewing"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":"Delivery"  , "Company":"Odell Brewing Company"  , "Address":"800 East Lincoln Avenue"  , "City":"Fort Collins"  , "State":"CO"  , "PostalCode":"80524"  , "Latitude":"40.5894674"  , "Longitude":"-105.0631819"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^0^0^0^0^0^0^0^0^0^0^0^0^" , "StopsperWeek":"0.250000"  , "WeeklySumOfCaseEquiv":"0"  , "WeeklySumOfCases":"0"  , "OSEQ":"9"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":0.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"0"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "13963"  , "Activity": "Delivery"  , "StopActivity":"Delivery"  , "Phase": "1"  , "OldPhase":"1"  , "Sequence":"9"  , "OldSequence":"9"  , "OldRouteID":"890" } ] }
//                 ,
//                 {
//                   "StopID":"13965"  , "CustomerID":"837"  , "Seq":"10"  , "UserName":"BELLASMARKET"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":"Delivery"  , "Company":"Bellas Market-Wellington"  , "Address":"7670 5th Street"  , "City":"Wellington"  , "State":"CO"  , "PostalCode":"80549"  , "Latitude":"40.6961589"  , "Longitude":"-105.00189109999997"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^0^0^0^0^0^0^0^0^0^0^0^0^" , "StopsperWeek":"0.250000"  , "WeeklySumOfCaseEquiv":"0"  , "WeeklySumOfCases":"0"  , "OSEQ":"10"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":0.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"0"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "13965"  , "Activity": "Delivery"  , "StopActivity":"Delivery"  , "Phase": "4"  , "OldPhase":"4"  , "Sequence":"10"  , "OldSequence":"10"  , "OldRouteID":"890" } ] }
//                 ,
//                 {
//                   "StopID":"13967"  , "CustomerID":"812"  , "Seq":"11"  , "UserName":"WELLCO"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":"Delivery"  , "Company":"Wellco Oil"  , "Address":"8314 6th St"  , "City":"Wellington"  , "State":"CO"  , "PostalCode":"80549"  , "Latitude":"40.70567"  , "Longitude":"-105.0002775"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^0^0^0^0^0^0^0^0^0^0^0^0^" , "StopsperWeek":"0.250000"  , "WeeklySumOfCaseEquiv":"0"  , "WeeklySumOfCases":"0"  , "OSEQ":"11"  , "OnPremise":"False"  , "DraftPackage":"1"  , "CustomerDuration":0.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"0"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "13967"  , "Activity": "Delivery"  , "StopActivity":"Delivery"  , "Phase": "3"  , "OldPhase":"3"  , "Sequence":"11"  , "OldSequence":"11"  , "OldRouteID":"890" } ] }
//                 ,
//                 {
//                   "StopID":"13969"  , "CustomerID":"787"  , "Seq":"12"  , "UserName":"CANTINALIQU"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":"Delivery"  , "Company":"Cantina Liquors"  , "Address":"8310 6th St"  , "City":"Wellington"  , "State":"CO"  , "PostalCode":"80549"  , "Latitude":"40.7056597"  , "Longitude":"-104.99980729999999"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^0^0^0^0^0^0^0^0^0^0^0^0^" , "StopsperWeek":"0.250000"  , "WeeklySumOfCaseEquiv":"0"  , "WeeklySumOfCases":"0"  , "OSEQ":"12"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":0.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"0"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "13969"  , "Activity": "Delivery"  , "StopActivity":"Delivery"  , "Phase": "3"  , "OldPhase":"3"  , "Sequence":"12"  , "OldSequence":"12"  , "OldRouteID":"890" } ] }
//                 ,
//                 {
//                   "StopID":"13971"  , "CustomerID":"218"  , "Seq":"13"  , "UserName":"TETON"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":"Delivery"  , "Company":"Teton Distributors"  , "Address":"Po Box 58"  , "City":"Worland"  , "State":"WY"  , "PostalCode":"82401"  , "Latitude":"41.1399814"  , "Longitude":"-104.8202462"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^0^0^0^0^0^0^0^0^0^0^0^0^" , "StopsperWeek":"0.250000"  , "WeeklySumOfCaseEquiv":"0"  , "WeeklySumOfCases":"0"  , "OSEQ":"13"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":0.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"0"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "13971"  , "Activity": "Delivery"  , "StopActivity":"Delivery"  , "Phase": "2"  , "OldPhase":"2"  , "Sequence":"13"  , "OldSequence":"13"  , "OldRouteID":"890" } ] }
//                 ,
//                 {
//                   "StopID":"13973"  , "CustomerID":"214"  , "Seq":"14"  , "UserName":"ADMIRALBEV"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":"Delivery"  , "Company":"Admiral Beverage"  , "Address":"110 Cleveland Place"  , "City":"Cheyenne"  , "State":"WY"  , "PostalCode":"80029"  , "Latitude":"41.1399814"  , "Longitude":"-104.8202462"  , "WarehouseByStopDistance":184.365  , "NumUnitsStr":"0^0^10^0^0^0^10^0^0^1^0^0^0^1^" , "StopsperWeek":"0.250000"  , "WeeklySumOfCaseEquiv":"0.833"  , "WeeklySumOfCases":"0.833"  , "OSEQ":"14"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":29.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"129.57"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "13973"  , "Activity": "Delivery"  , "StopActivity":"Delivery"  , "Phase": "1"  , "OldPhase":"1"  , "Sequence":"14"  , "OldSequence":"14"  , "OldRouteID":"890" } ] }
//                 ,
//                 {
//                   "StopID":"13975"  , "CustomerID":"43"  , "Seq":"15"  , "UserName":"Ann"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":"Delivery"  , "Company":"Ann Connelly"  , "Address":"Po Box 118"  , "City":"Gering"  , "State":"NE"  , "PostalCode":"69341"  , "Latitude":"41.8241667"  , "Longitude":"-103.665"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^6^0^0^0^6^0^0^0^0^0^0^0^" , "StopsperWeek":"0.250000"  , "WeeklySumOfCaseEquiv":"0.451"  , "WeeklySumOfCases":"0.5"  , "OSEQ":"15"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":18.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"100.55"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "13975"  , "Activity": "Delivery"  , "StopActivity":"Delivery"  , "Phase": "3"  , "OldPhase":"3"  , "Sequence":"15"  , "OldSequence":"15"  , "OldRouteID":"890" } ] }
//                 ,
//                 {
//                   "StopID":"13977"  , "CustomerID":"18"  , "Seq":"16"  , "UserName":"1DIETRIC"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":"Delivery"  , "Company":"1 Dietrich Distributing"  , "Address":"102 Lakeview Drive"  , "City":"Gering"  , "State":"NE"  , "PostalCode":"69341"  , "Latitude":"41.8438"  , "Longitude":"-103.664"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^0^0^0^0^0^0^0^0^0^0^0^0^" , "StopsperWeek":"0.250000"  , "WeeklySumOfCaseEquiv":"0"  , "WeeklySumOfCases":"0"  , "OSEQ":"16"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":0.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"0"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "13977"  , "Activity": "Delivery"  , "StopActivity":"Delivery"  , "Phase": "1"  , "OldPhase":"1"  , "Sequence":"16"  , "OldSequence":"16"  , "OldRouteID":"890" } ] }
//                 ,
//                 {
//                   "StopID":"13979"  , "CustomerID":"562"  , "Seq":"17"  , "UserName":"GERARROW"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":"Delivery"  , "Company":"Arrowhead Gering"  , "Address":"3434 Lyman Drive"  , "City":"Gering"  , "State":"NE"  , "PostalCode":"69341"  , "Latitude":"41.8424"  , "Longitude":"-103.66500000000002"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^51^0^0^0^51^0^0^4^0^0^0^4^" , "StopsperWeek":"0.250000"  , "WeeklySumOfCaseEquiv":"4.091"  , "WeeklySumOfCases":"4.25"  , "OSEQ":"17"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":153.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"1291.39"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "13979"  , "Activity": "Delivery"  , "StopActivity":"Delivery"  , "Phase": "3"  , "OldPhase":"3"  , "Sequence":"17"  , "OldSequence":"17"  , "OldRouteID":"890" } ] }
//                 ,
//                 {
//                   "StopID":"13981"  , "CustomerID":"767"  , "Seq":"18"  , "UserName":"ARROWHEADPA"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":"Delivery"  , "Company":"Arrowhead Paper Only"  , "Address":"3434 Lyman Drive"  , "City":"Gering"  , "State":"NE"  , "PostalCode":"69341"  , "Latitude":"41.8424"  , "Longitude":"-103.66500000000002"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^0^0^0^0^0^0^0^0^0^0^0^0^0^" , "StopsperWeek":"0.250000"  , "WeeklySumOfCaseEquiv":"0"  , "WeeklySumOfCases":"0"  , "OSEQ":"18"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":0.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"0"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "13981"  , "Activity": "Delivery"  , "StopActivity":"Delivery"  , "Phase": "2"  , "OldPhase":"2"  , "Sequence":"18"  , "OldSequence":"18"  , "OldRouteID":"890" } ] }
//                 ,
//                 {
//                   "StopID":"13983"  , "CustomerID":"2290"  , "Seq":"19"  , "UserName":"HOTSPOT"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":"Delivery"  , "Company":"Hot Spot"  , "Address":"620 Main St"  , "City":"Peetz"  , "State":"CO"  , "PostalCode":"80747"  , "Latitude":"40.961815"  , "Longitude":"-103.112726"  , "WarehouseByStopDistance":47.843  , "NumUnitsStr":"0^7^66^0^0^0^73^0^1^6^0^0^0^7^" , "StopsperWeek":"0.250000"  , "WeeklySumOfCaseEquiv":"8.753"  , "WeeklySumOfCases":"6.083"  , "OSEQ":"19"  , "OnPremise":"True"  , "DraftPackage":"2"  , "CustomerDuration":218.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"2305.15"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "13983"  , "Activity": "Delivery"  , "StopActivity":"Delivery"  , "Phase": "4"  , "OldPhase":"4"  , "Sequence":"19"  , "OldSequence":"19"  , "OldRouteID":"890" } ] }
//                 ,
//                 {
//                   "StopID":"13985"  , "CustomerID":"2295"  , "Seq":"20"  , "UserName":"DJPACK"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":"Delivery"  , "Company":"D&J"  , "Address":"620 Main Street"  , "City":"Peetz"  , "State":"CO"  , "PostalCode":"80747"  , "Latitude":"40.961815"  , "Longitude":"-103.112726"  , "WarehouseByStopDistance":47.843  , "NumUnitsStr":"0^0^36^0^0^0^36^0^0^3^0^0^0^3^" , "StopsperWeek":"0.250000"  , "WeeklySumOfCaseEquiv":"3.313"  , "WeeklySumOfCases":"3"  , "OSEQ":"20"  , "OnPremise":"False"  , "DraftPackage":"2"  , "CustomerDuration":108.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"748.95"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "13985"  , "Activity": "Delivery"  , "StopActivity":"Delivery"  , "Phase": "1"  , "OldPhase":"1"  , "Sequence":"20"  , "OldSequence":"20"  , "OldRouteID":"890" } ] }
//                 ,
//                 {
//                   "StopID":"13987"  , "CustomerID":"1028"  , "Seq":"21"  , "UserName":"BIGB"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":"Delivery"  , "Company":"BIG B\u0027S BAR & GRILL"  , "Address":"214 MAIN ST"  , "City":"Ovid"  , "State":"CO"  , "PostalCode":"80744"  , "Latitude":"40.9596916"  , "Longitude":"-102.3877531"  , "WarehouseByStopDistance":90.228  , "NumUnitsStr":"0^4^79^0^0^0^83^0^0^7^0^0^0^7^" , "StopsperWeek":"0.500000"  , "WeeklySumOfCaseEquiv":"8.874"  , "WeeklySumOfCases":"6.917"  , "OSEQ":"21"  , "OnPremise":"True"  , "DraftPackage":"2"  , "CustomerDuration":249.000012000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"2328"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "13987"  , "Activity": "Delivery"  , "StopActivity":"Delivery"  , "Phase": "24"  , "OldPhase":"24"  , "Sequence":"21"  , "OldSequence":"21"  , "OldRouteID":"890" } ] }
//                 ,
//                 {
//                   "StopID":"13989"  , "CustomerID":"2300"  , "Seq":"22"  , "UserName":"SEDGLIQ"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":"Delivery"  , "Company":"Sedgwick Liquor"  , "Address":"127 Main Street"  , "City":"Sedgwick"  , "State":"CO"  , "PostalCode":"80749"  , "Latitude":"40.9346756"  , "Longitude":"-102.5236656"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^1^374^0^0^0^375^0^0^31^0^0^0^31^" , "StopsperWeek":"0.500000"  , "WeeklySumOfCaseEquiv":"34.346"  , "WeeklySumOfCases":"31.25"  , "OSEQ":"22"  , "OnPremise":"False"  , "DraftPackage":"3"  , "CustomerDuration":1125.000000000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"6360.35"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "13989"  , "Activity": "Delivery"  , "StopActivity":"Delivery"  , "Phase": "24"  , "OldPhase":"24"  , "Sequence":"22"  , "OldSequence":"22"  , "OldRouteID":"890" } ] }
//                 ,
//                 {
//                   "StopID":"13991"  , "CustomerID":"2310"  , "Seq":"23"  , "UserName":"RDSPLACE"  , "Activity":"Delivery"  , "OrigActivity":"Delivery"  , "StopActivity":"Delivery"  , "Company":"Rd\u0027s Place"  , "Address":"125 Main Ave"  , "City":"Sedgwick"  , "State":"CO"  , "PostalCode":"80749"  , "Latitude":"40.9346574"  , "Longitude":"-102.5236656"  , "WarehouseByStopDistance":-1  , "NumUnitsStr":"0^55^171^0^0^0^226^0^5^14^0^0^0^19^" , "StopsperWeek":"0.500000"  , "WeeklySumOfCaseEquiv":"46.357"  , "WeeklySumOfCases":"18.833"  , "OSEQ":"23"  , "OnPremise":"True"  , "DraftPackage":"2"  , "CustomerDuration":677.999988000000  , "Fsm":900.000000  , "DriveDuration":""  , "Duration":0  , "StartTime":0  , "Services":[
//                 ]
//
//                   , "Deleted":"false"
//                   , "ExtPrice":"9378.65"  , "ProductGroups": [
//                   {    "ProductGroupID": ""  , "ProductGroup": ""  , "StopID": "13991"  , "Activity": "Delivery"  , "StopActivity":"Delivery"  , "Phase": "13"  , "OldPhase":"13"  , "Sequence":"23"  , "OldSequence":"23"  , "OldRouteID":"890" } ] }
//               ]
//             }
//           ]
//         }
//
//       ;
//     const deliveryManJson=
//       {"DeliveryManJson":[{"UserName":"Ann"},{"UserName":"Ann_2"},{"UserName":"BLAKE"},{"UserName":"Brennan"},{"UserName":"Cody"},{"UserName":"Darin"},{"UserName":"FORMEMPSTER"},{"UserName":"FORMEREMPLO"},{"UserName":"Gary"},{"UserName":"GXS"},{"UserName":"Jake"},{"UserName":"JAlthen"},{"UserName":"JeffO"},{"UserName":"JoeD"},{"UserName":"JOEW"},{"UserName":"Kathy"},{"UserName":"Kent_3"},{"UserName":"KyleD"},{"UserName":"LaneControl"},{"UserName":"Matts"},{"UserName":"MeghanA"},{"UserName":"MMeinert"},{"UserName":"NicholasB"},{"UserName":"Patrick"},{"UserName":"Robby"},{"UserName":"Robert"},{"UserName":"SarahD"},{"UserName":"Toby"},{"UserName":"TomLangkamp"},{"UserName":"ZachH"}],"recordCount":30}
//       ;
//     return {rootJson, routePlannerRootJson,deliveryManJson};
//   }
// }
