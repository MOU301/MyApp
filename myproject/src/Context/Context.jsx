
import { createContext, useState,useEffect, useCallback } from "react";
import axiosInstance from "../API/Api";
import axios from "axios";
import { use } from "react";
const maincarousel=['A1.jpg','A1.jpg','A1.jpg'];
const about=[
  {"text":[
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis beatae fugiat animi consectetur dolores vitae iusto? Iste aliquam quibusdam amet consequuntur quod voluptas aperiam, repudiandae magni deleniti quisquam doloremque sed.",
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis beatae fugiat animi consectetur dolores vitae iusto? Iste aliquam quibusdam amet consequuntur quod voluptas ",
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis beatae fugiat animi consectetur dolores vitae iusto? Iste aliquam quibusdam amet "
  ]},
  {"image":"../../../src/assets/test/about.jpeg"}
]
// const views=[
//     {
//         "name":"Mohammad",
//         "view":"With supporting text below as a natural lead-in to additional content.",
//         "learn":["A1","A2","B1"]
//     },{
//         "name":"Sara",
//         "view":"With supporting text additional content.",
//         "learn":["A1"]  
//     },{
//         "name":"Motaz",
//         "view":"With supporting text additional content. and the techer is very goog ",
//         "learn":["A1","B2"]  
//     },{
//         "name":"Anna",
//         "view":"With supporting text additional content. and the video is simpall",
//         "learn":["A1","A2","B1"]       
//     }
// ]
// const myCouresData=[{
//   "id":1,
//   "bostter":"A1.jpg",
//   "title":"E A1",
//   "author":"momo",
//   "description":"the leher is sehr gut and er arbeit mit der lerhning meh 10 jahre alt so er war in deutschland",
//   "price":"20",
//   "lessons":[
//     {
//       "id":9,
//       "title":"vorstellen",
//       "number":1,
//        "lesson_data":[
//          {"id":0,
//            "type":"video",
//            "src":"../../../src/assets/test/test"
//        },
//        {
//        "id":1,
//        "type":"ubung1",
//        "text":"Lorem ipsum dolor *** amet consectetur adipisicing ***.Recusandae praesentium et unde blanditiis laborum temporibus eveniet, iusto, *** modi fugit enim reiciendis *** deserunt *** facilis quaerat aspernatur *** pariatur sunt *** magni, perferendis laboriosam hic. Enim quos, reprehenderit temporibus laudantium mollitia error facere,*** vero voluptatibus sed *** asperiores eos porro debitis rerum *** doloremque qui labore quis.",
//        "ubung":['her','dir','sir','fir','sir','mir','ihr','uns','dich','sich','mir']
//    },{
//        "id":2,
//        "type":'ubung2',
//        'text':["how are you ?","how are you","how are you ?","wie alt bist du ?","lebst du mich ?"],
//        "ubung":[0,1,0,0,1]
//    },{
//        "id":3,
//        "type":"audio",
//         "src":"../../../src/assets/test/test"
//    },
//    {    "id":3,
//        "type":"ubung3",
//        'text':['one','tow','three','four'],
//        'ubung':['one','tow','three','four']
//    },{
//        "id":4,
//        "type":"ubung4",
//        "src":["stift.jpg","buch.jpg","radiergummi.jpg","stuhl.jpg"],
//        "ubung":["stift","buch","radiergummi","stuhl"]
//    },{
//        "id":5,
//      "type":"dialog",
//      "src":["dialog.jpg"],
//      "text":"Ahmad**Anna, kommst du eigentlich aus Deutschland?**Anna**Ja, ich bin hier aufgewachsen, aber geboren bin ich in Russland. Meine Eltern sind von Sankt Petersburg nach Hamburg gezogen, als ich sehr klein war.**Ahmad**Interessant. Wie alt warst du damals?**Anna**Drei Jahre und zehn Monate, also fast vier.**Ahmad**Und kannst du dich an die Zeit in Russland erinnern?**Anna**Nicht wirklich. Ich habe fast alles vergessen.**Ahmad**Das ist schade! Aber du sprichst Russisch, oder?**Anna**Ja, zu Hause haben meine Eltern immer Russisch gesprochen. Also habe ich das auch gelernt. Mein Deutsch ist aber viel besser.**Ahmad**Wieso denn das? Russisch ist doch deine Muttersprache.**Anna**Ja, schon, aber ich bin in Deutschland zur Schule gegangen und studiere jetzt in Leipzig an der Universität. Russisch spreche ich nur in der Freizeit mit Verwandten und Freunden. Viele Wörter kenne ich aber nur auf Deutsch. Deshalb kann ich mich über schwierige Themen in dieser Sprache besser unterhalten.**Ahmad**Das kann ich verstehen. Ich bin nämlich auch zweisprachig aufgewachsen.**Anna**Echt? Das wusste ich gar nicht.**Ahmad**Ja, aber das erzähle ich dir ein anderes Mal. Jetzt muss ich los.**Anna**Alles klar. Dann bis später!"
//    },{
//        "id":6,
//      "type":"dialog",
//      "src":["dialog.jpg"],
//      "text":"Ahmad222**Anna, kommst du eigentlich aus Deutschland?**Anna**Ja, ich bin hier aufgewachsen, aber geboren bin ich in Russland. Meine Eltern sind von Sankt Petersburg nach Hamburg gezogen, als ich sehr klein war.**Ahmad**Interessant. Wie alt warst du damals?**Anna**Drei Jahre und zehn Monate, also fast vier.**Ahmad**Und kannst du dich an die Zeit in Russland erinnern?**Anna**Nicht wirklich. Ich habe fast alles vergessen.**Ahmad**Das ist schade! Aber du sprichst Russisch, oder?**Anna**Ja, zu Hause haben meine Eltern immer Russisch gesprochen. Also habe ich das auch gelernt. Mein Deutsch ist aber viel besser.**Ahmad**Wieso denn das? Russisch ist doch deine Muttersprache.**Anna**Ja, schon, aber ich bin in Deutschland zur Schule gegangen und studiere jetzt in Leipzig an der Universität. Russisch spreche ich nur in der Freizeit mit Verwandten und Freunden. Viele Wörter kenne ich aber nur auf Deutsch. Deshalb kann ich mich über schwierige Themen in dieser Sprache besser unterhalten.**Ahmad**Das kann ich verstehen. Ich bin nämlich auch zweisprachig aufgewachsen.**Anna**Echt? Das wusste ich gar nicht.**Ahmad**Ja, aber das erzähle ich dir ein anderes Mal. Jetzt muss ich los.**Anna**Alles klar. Dann bis später!"
//    },{
//        "id":7,
//        "type":"summary",
//        "src":"../../../src/assets/test/summary.jpg"
//    }]
//    }
//   ]
//  },{"id":2,
//   "bostter":"A1.jpg",
//   "title":"E B1",
//   "author":"momo",
//   "description":"the leher is sehr gut and er arbeit mit der lerhning meh 10 jahre alt so er war in deutschland",
//   "price":"20",
//   "lessons":[
//     {
//       "id":7,
//       "title":"vorstellen",
//       "number":1,
//        "lesson_data":[
//          {"id":0,
//            "type":"video",
//            "src":"../../../src/assets/test/test"
//        },
//        {
//        "id":1,
//        "type":"ubung1",
//        "text":"Lorem ipsum dolor *** amet consectetur adipisicing ***.Recusandae praesentium et unde blanditiis laborum temporibus eveniet, iusto, *** modi fugit enim reiciendis *** deserunt *** facilis quaerat aspernatur *** pariatur sunt *** magni, perferendis laboriosam hic. Enim quos, reprehenderit temporibus laudantium mollitia error facere,*** vero voluptatibus sed *** asperiores eos porro debitis rerum *** doloremque qui labore quis.",
//        "ubung":['her','dir','sir','fir','sir','mir','ihr','uns','dich','sich','mir']
//    },{
//        "id":2,
//        "type":'ubung2',
//        'text':["how are you ?","how are you","how are you ?","wie alt bist du ?","lebst du mich ?"],
//        "ubung":[0,1,0,0,1]
//    },{
//        "id":3,
//        "type":"audio",
//         "src":"../../../src/assets/test/test"
//    },
//    {    "id":3,
//        "type":"ubung3",
//        'text':['one','tow','three','four'],
//        'ubung':['one','tow','three','four']
//    },{
//        "id":4,
//        "type":"ubung4",
//        "src":["stift.jpg","buch.jpg","radiergummi.jpg","stuhl.jpg"],
//        "ubung":["stift","buch","radiergummi","stuhl"]
//    },{
//        "id":5,
//      "type":"dialog",
//      "src":["dialog.jpg"],
//      "text":"Ahmad**Anna, kommst du eigentlich aus Deutschland?**Anna**Ja, ich bin hier aufgewachsen, aber geboren bin ich in Russland. Meine Eltern sind von Sankt Petersburg nach Hamburg gezogen, als ich sehr klein war.**Ahmad**Interessant. Wie alt warst du damals?**Anna**Drei Jahre und zehn Monate, also fast vier.**Ahmad**Und kannst du dich an die Zeit in Russland erinnern?**Anna**Nicht wirklich. Ich habe fast alles vergessen.**Ahmad**Das ist schade! Aber du sprichst Russisch, oder?**Anna**Ja, zu Hause haben meine Eltern immer Russisch gesprochen. Also habe ich das auch gelernt. Mein Deutsch ist aber viel besser.**Ahmad**Wieso denn das? Russisch ist doch deine Muttersprache.**Anna**Ja, schon, aber ich bin in Deutschland zur Schule gegangen und studiere jetzt in Leipzig an der Universität. Russisch spreche ich nur in der Freizeit mit Verwandten und Freunden. Viele Wörter kenne ich aber nur auf Deutsch. Deshalb kann ich mich über schwierige Themen in dieser Sprache besser unterhalten.**Ahmad**Das kann ich verstehen. Ich bin nämlich auch zweisprachig aufgewachsen.**Anna**Echt? Das wusste ich gar nicht.**Ahmad**Ja, aber das erzähle ich dir ein anderes Mal. Jetzt muss ich los.**Anna**Alles klar. Dann bis später!"
//    },{
//        "id":6,
//      "type":"dialog",
//      "src":["dialog.jpg"],
//      "text":"Ahmad222**Anna, kommst du eigentlich aus Deutschland?**Anna**Ja, ich bin hier aufgewachsen, aber geboren bin ich in Russland. Meine Eltern sind von Sankt Petersburg nach Hamburg gezogen, als ich sehr klein war.**Ahmad**Interessant. Wie alt warst du damals?**Anna**Drei Jahre und zehn Monate, also fast vier.**Ahmad**Und kannst du dich an die Zeit in Russland erinnern?**Anna**Nicht wirklich. Ich habe fast alles vergessen.**Ahmad**Das ist schade! Aber du sprichst Russisch, oder?**Anna**Ja, zu Hause haben meine Eltern immer Russisch gesprochen. Also habe ich das auch gelernt. Mein Deutsch ist aber viel besser.**Ahmad**Wieso denn das? Russisch ist doch deine Muttersprache.**Anna**Ja, schon, aber ich bin in Deutschland zur Schule gegangen und studiere jetzt in Leipzig an der Universität. Russisch spreche ich nur in der Freizeit mit Verwandten und Freunden. Viele Wörter kenne ich aber nur auf Deutsch. Deshalb kann ich mich über schwierige Themen in dieser Sprache besser unterhalten.**Ahmad**Das kann ich verstehen. Ich bin nämlich auch zweisprachig aufgewachsen.**Anna**Echt? Das wusste ich gar nicht.**Ahmad**Ja, aber das erzähle ich dir ein anderes Mal. Jetzt muss ich los.**Anna**Alles klar. Dann bis später!"
//    },{
//        "id":7,
//        "type":"summary",
//        "src":"../../../src/assets/test/summary.jpg"
//    }]
//    }, {
//     "id":22,
//     "title":"vorstellen",
//     "number":2,
//      "lesson_data":[
//        {"id":0,
//          "type":"video",
//          "src":"../../../src/assets/test/test"
//      },
//      {
//      "id":1,
//      "type":"ubung1",
//      "text":"Lorem ipsum dolor *** amet consectetur adipisicing ***.Recusandae praesentium et unde blanditiis laborum temporibus eveniet, iusto, *** modi fugit enim reiciendis *** deserunt *** facilis quaerat aspernatur *** pariatur sunt *** magni, perferendis laboriosam hic. Enim quos, reprehenderit temporibus laudantium mollitia error facere,*** vero voluptatibus sed *** asperiores eos porro debitis rerum *** doloremque qui labore quis.",
//      "ubung":['her','dir','sir','fir','sir','mir','ihr','uns','dich','sich','mir']
//  },{
//      "id":2,
//      "type":'ubung2',
//      'text':["how are you ?","how are you","how are you ?","wie alt bist du ?","lebst du mich ?"],
//      "ubung":[0,1,0,0,1]
//  },{
//      "id":3,
//      "type":"audio",
//       "src":"../../../src/assets/test/test"
//  },
//  {    "id":3,
//      "type":"ubung3",
//      'text':['one','tow','three','four'],
//      'ubung':['one','tow','three','four']
//  },{
//      "id":4,
//      "type":"ubung4",
//      "src":["stift.jpg","buch.jpg","radiergummi.jpg","stuhl.jpg"],
//      "ubung":["stift","buch","radiergummi","stuhl"]
//  },{
//      "id":5,
//    "type":"dialog",
//    "src":["dialog.jpg"],
//    "text":"Ahmad**Anna, kommst du eigentlich aus Deutschland?**Anna**Ja, ich bin hier aufgewachsen, aber geboren bin ich in Russland. Meine Eltern sind von Sankt Petersburg nach Hamburg gezogen, als ich sehr klein war.**Ahmad**Interessant. Wie alt warst du damals?**Anna**Drei Jahre und zehn Monate, also fast vier.**Ahmad**Und kannst du dich an die Zeit in Russland erinnern?**Anna**Nicht wirklich. Ich habe fast alles vergessen.**Ahmad**Das ist schade! Aber du sprichst Russisch, oder?**Anna**Ja, zu Hause haben meine Eltern immer Russisch gesprochen. Also habe ich das auch gelernt. Mein Deutsch ist aber viel besser.**Ahmad**Wieso denn das? Russisch ist doch deine Muttersprache.**Anna**Ja, schon, aber ich bin in Deutschland zur Schule gegangen und studiere jetzt in Leipzig an der Universität. Russisch spreche ich nur in der Freizeit mit Verwandten und Freunden. Viele Wörter kenne ich aber nur auf Deutsch. Deshalb kann ich mich über schwierige Themen in dieser Sprache besser unterhalten.**Ahmad**Das kann ich verstehen. Ich bin nämlich auch zweisprachig aufgewachsen.**Anna**Echt? Das wusste ich gar nicht.**Ahmad**Ja, aber das erzähle ich dir ein anderes Mal. Jetzt muss ich los.**Anna**Alles klar. Dann bis später!"
//  },{
//      "id":6,
//    "type":"dialog",
//    "src":["dialog.jpg"],
//    "text":"Ahmad222**Anna, kommst du eigentlich aus Deutschland?**Anna**Ja, ich bin hier aufgewachsen, aber geboren bin ich in Russland. Meine Eltern sind von Sankt Petersburg nach Hamburg gezogen, als ich sehr klein war.**Ahmad**Interessant. Wie alt warst du damals?**Anna**Drei Jahre und zehn Monate, also fast vier.**Ahmad**Und kannst du dich an die Zeit in Russland erinnern?**Anna**Nicht wirklich. Ich habe fast alles vergessen.**Ahmad**Das ist schade! Aber du sprichst Russisch, oder?**Anna**Ja, zu Hause haben meine Eltern immer Russisch gesprochen. Also habe ich das auch gelernt. Mein Deutsch ist aber viel besser.**Ahmad**Wieso denn das? Russisch ist doch deine Muttersprache.**Anna**Ja, schon, aber ich bin in Deutschland zur Schule gegangen und studiere jetzt in Leipzig an der Universität. Russisch spreche ich nur in der Freizeit mit Verwandten und Freunden. Viele Wörter kenne ich aber nur auf Deutsch. Deshalb kann ich mich über schwierige Themen in dieser Sprache besser unterhalten.**Ahmad**Das kann ich verstehen. Ich bin nämlich auch zweisprachig aufgewachsen.**Anna**Echt? Das wusste ich gar nicht.**Ahmad**Ja, aber das erzähle ich dir ein anderes Mal. Jetzt muss ich los.**Anna**Alles klar. Dann bis später!"
//  },{
//      "id":7,
//      "type":"summary",
//      "src":"../../../src/assets/test/summary.jpg"
//  }]
//  }
//   ]
//  }];
// const courses=[
//        {"id":5,
//         "bostter":"A1.jpg",
//         "title":"B1",
//         "author":"momo",
//         "description":"the leher is sehr gut and er arbeit mit der lerhning meh 10 jahre alt so er war in deutschland",
//         "price":"20",
//         "lessons":[
//           { 
//             "id":10,
//             "title":"vorstellen",
//             "number":1,
//              "lesson_data":[
//                {"id":0,
//                  "type":"video",
//                  "src":"../../../src/assets/test/test"
//              },
//              {
//              "id":1,
//              "type":"ubung1",
//              "text":"Lorem ipsum dolor *** amet consectetur adipisicing ***.Recusandae praesentium et unde blanditiis laborum temporibus eveniet, iusto, *** modi fugit enim reiciendis *** deserunt *** facilis quaerat aspernatur *** pariatur sunt *** magni, perferendis laboriosam hic. Enim quos, reprehenderit temporibus laudantium mollitia error facere,*** vero voluptatibus sed *** asperiores eos porro debitis rerum *** doloremque qui labore quis.",
//              "ubung":['her','dir','sir','fir','sir','mir','ihr','uns','dich','sich','mir']
//          },{
//              "id":2,
//              "type":'ubung2',
//              'text':["how are you ?","how are you","how are you ?","wie alt bist du ?","lebst du mich ?"],
//              "ubung":[0,1,0,0,1]
//          },{
//              "id":3,
//              "type":"audio",
//               "src":"../../../src/assets/test/test"
//          },
//          {    "id":3,
//              "type":"ubung3",
//              'text':['one','tow','three','four'],
//              'ubung':['one','tow','three','four']
//          },{
//              "id":4,
//              "type":"ubung4",
//              "src":["stift.jpg","buch.jpg","radiergummi.jpg","stuhl.jpg"],
//              "ubung":["stift","buch","radiergummi","stuhl"]
//          },{
//              "id":5,
//            "type":"dialog",
//            "src":["dialog.jpg"],
//            "text":"Ahmad**Anna, kommst du eigentlich aus Deutschland?**Anna**Ja, ich bin hier aufgewachsen, aber geboren bin ich in Russland. Meine Eltern sind von Sankt Petersburg nach Hamburg gezogen, als ich sehr klein war.**Ahmad**Interessant. Wie alt warst du damals?**Anna**Drei Jahre und zehn Monate, also fast vier.**Ahmad**Und kannst du dich an die Zeit in Russland erinnern?**Anna**Nicht wirklich. Ich habe fast alles vergessen.**Ahmad**Das ist schade! Aber du sprichst Russisch, oder?**Anna**Ja, zu Hause haben meine Eltern immer Russisch gesprochen. Also habe ich das auch gelernt. Mein Deutsch ist aber viel besser.**Ahmad**Wieso denn das? Russisch ist doch deine Muttersprache.**Anna**Ja, schon, aber ich bin in Deutschland zur Schule gegangen und studiere jetzt in Leipzig an der Universität. Russisch spreche ich nur in der Freizeit mit Verwandten und Freunden. Viele Wörter kenne ich aber nur auf Deutsch. Deshalb kann ich mich über schwierige Themen in dieser Sprache besser unterhalten.**Ahmad**Das kann ich verstehen. Ich bin nämlich auch zweisprachig aufgewachsen.**Anna**Echt? Das wusste ich gar nicht.**Ahmad**Ja, aber das erzähle ich dir ein anderes Mal. Jetzt muss ich los.**Anna**Alles klar. Dann bis später!"
//          },{
//              "id":6,
//            "type":"dialog",
//            "src":["dialog.jpg"],
//            "text":"Ahmad222**Anna, kommst du eigentlich aus Deutschland?**Anna**Ja, ich bin hier aufgewachsen, aber geboren bin ich in Russland. Meine Eltern sind von Sankt Petersburg nach Hamburg gezogen, als ich sehr klein war.**Ahmad**Interessant. Wie alt warst du damals?**Anna**Drei Jahre und zehn Monate, also fast vier.**Ahmad**Und kannst du dich an die Zeit in Russland erinnern?**Anna**Nicht wirklich. Ich habe fast alles vergessen.**Ahmad**Das ist schade! Aber du sprichst Russisch, oder?**Anna**Ja, zu Hause haben meine Eltern immer Russisch gesprochen. Also habe ich das auch gelernt. Mein Deutsch ist aber viel besser.**Ahmad**Wieso denn das? Russisch ist doch deine Muttersprache.**Anna**Ja, schon, aber ich bin in Deutschland zur Schule gegangen und studiere jetzt in Leipzig an der Universität. Russisch spreche ich nur in der Freizeit mit Verwandten und Freunden. Viele Wörter kenne ich aber nur auf Deutsch. Deshalb kann ich mich über schwierige Themen in dieser Sprache besser unterhalten.**Ahmad**Das kann ich verstehen. Ich bin nämlich auch zweisprachig aufgewachsen.**Anna**Echt? Das wusste ich gar nicht.**Ahmad**Ja, aber das erzähle ich dir ein anderes Mal. Jetzt muss ich los.**Anna**Alles klar. Dann bis später!"
//          },{
//              "id":7,
//              "type":"summary",
//              "src":"../../../src/assets/test/summary.jpg"
//          }]
//          }, { 
//           "id":11,
//           "title":"vorstellen",
//           "number":1,
//            "lesson_data":[
//              {"id":0,
//                "type":"video",
//                "src":"../../../src/assets/test/test"
//            },
//            {
//            "id":1,
//            "type":"filltext",
//            "text":"Lorem ipsum dolor *** amet consectetur adipisicing ***.Recusandae praesentium et unde blanditiis laborum temporibus eveniet, iusto, *** modi fugit enim reiciendis *** deserunt *** facilis quaerat aspernatur *** pariatur sunt *** magni, perferendis laboriosam hic. Enim quos, reprehenderit temporibus laudantium mollitia error facere,*** vero voluptatibus sed *** asperiores eos porro debitis rerum *** doloremque qui labore quis.",
//            "ubung":['her','dir','sir','fir','sir','mir','ihr','uns','dich','sich','mir']
//        },{
//            "id":2,
//            "type":'trueandfalse',
//            'text':["how are you ?","how are you","how are you ?","wie alt bist du ?","lebst du mich ?"],
//            "ubung":[0,1,0,0,1]
//        },{
//            "id":3,
//            "type":"audio",
//             "src":"../../../src/assets/test/test"
//        },
//        {    "id":3,
//            "type":"questionadnansur",
//            'text':['one','tow','three','four'],
//            'ubung':['one','tow','three','four']
//        },{
//            "id":4,
//            "type":"fillwithimage",
//            "src":["stift.jpg","buch.jpg","radiergummi.jpg","stuhl.jpg"],
//            "ubung":["stift","buch","radiergummi","stuhl"]
//        },{
//            "id":5,
//          "type":"dialog",
//          "src":["dialog.jpg"],
//          "text":"Ahmad**Anna, kommst du eigentlich aus Deutschland?**Anna**Ja, ich bin hier aufgewachsen, aber geboren bin ich in Russland. Meine Eltern sind von Sankt Petersburg nach Hamburg gezogen, als ich sehr klein war.**Ahmad**Interessant. Wie alt warst du damals?**Anna**Drei Jahre und zehn Monate, also fast vier.**Ahmad**Und kannst du dich an die Zeit in Russland erinnern?**Anna**Nicht wirklich. Ich habe fast alles vergessen.**Ahmad**Das ist schade! Aber du sprichst Russisch, oder?**Anna**Ja, zu Hause haben meine Eltern immer Russisch gesprochen. Also habe ich das auch gelernt. Mein Deutsch ist aber viel besser.**Ahmad**Wieso denn das? Russisch ist doch deine Muttersprache.**Anna**Ja, schon, aber ich bin in Deutschland zur Schule gegangen und studiere jetzt in Leipzig an der Universität. Russisch spreche ich nur in der Freizeit mit Verwandten und Freunden. Viele Wörter kenne ich aber nur auf Deutsch. Deshalb kann ich mich über schwierige Themen in dieser Sprache besser unterhalten.**Ahmad**Das kann ich verstehen. Ich bin nämlich auch zweisprachig aufgewachsen.**Anna**Echt? Das wusste ich gar nicht.**Ahmad**Ja, aber das erzähle ich dir ein anderes Mal. Jetzt muss ich los.**Anna**Alles klar. Dann bis später!"
//        },{
//            "id":6,
//          "type":"dialog",
//          "src":["dialog.jpg"],
//          "text":"Ahmad222**Anna, kommst du eigentlich aus Deutschland?**Anna**Ja, ich bin hier aufgewachsen, aber geboren bin ich in Russland. Meine Eltern sind von Sankt Petersburg nach Hamburg gezogen, als ich sehr klein war.**Ahmad**Interessant. Wie alt warst du damals?**Anna**Drei Jahre und zehn Monate, also fast vier.**Ahmad**Und kannst du dich an die Zeit in Russland erinnern?**Anna**Nicht wirklich. Ich habe fast alles vergessen.**Ahmad**Das ist schade! Aber du sprichst Russisch, oder?**Anna**Ja, zu Hause haben meine Eltern immer Russisch gesprochen. Also habe ich das auch gelernt. Mein Deutsch ist aber viel besser.**Ahmad**Wieso denn das? Russisch ist doch deine Muttersprache.**Anna**Ja, schon, aber ich bin in Deutschland zur Schule gegangen und studiere jetzt in Leipzig an der Universität. Russisch spreche ich nur in der Freizeit mit Verwandten und Freunden. Viele Wörter kenne ich aber nur auf Deutsch. Deshalb kann ich mich über schwierige Themen in dieser Sprache besser unterhalten.**Ahmad**Das kann ich verstehen. Ich bin nämlich auch zweisprachig aufgewachsen.**Anna**Echt? Das wusste ich gar nicht.**Ahmad**Ja, aber das erzähle ich dir ein anderes Mal. Jetzt muss ich los.**Anna**Alles klar. Dann bis später!"
//        },{
//            "id":7,
//            "type":"summary",
//            "src":"../../../src/assets/test/summary.jpg"
//        }]
//        }
//         ]
//        },{"id":6,
//         "bostter":"A1.jpg",
//         "title":"A1",
//         "author":"momo",
//         "description":"the leher is sehr gut and er arbeit mit der lerhning meh 10 jahre alt so er war in deutschland",
//         "price":"20",
//         "lessons":[
//           {
//             "id":20,
//             "title":"vorstellen",
//             "number":1,
//              "lesson_data":[
//                {"id":0,
//                  "type":"video",
//                  "src":"../../../src/assets/test/test"
//              },
//              {
//              "id":1,
//              "type":"filltext",
//              "text":"Lorem ipsum dolor *** amet consectetur adipisicing ***.Recusandae praesentium et unde blanditiis laborum temporibus eveniet, iusto, *** modi fugit enim reiciendis *** deserunt *** facilis quaerat aspernatur *** pariatur sunt *** magni, perferendis laboriosam hic. Enim quos, reprehenderit temporibus laudantium mollitia error facere,*** vero voluptatibus sed *** asperiores eos porro debitis rerum *** doloremque qui labore quis.",
//              "ubung":['her','dir','sir','fir','sir','mir','ihr','uns','dich','sich','mir']
//          },{
//              "id":2,
//              "type":'trueandfalse',
//              'text':["how are you ?","how are you","how are you ?","wie alt bist du ?","lebst du mich ?"],
//              "ubung":[0,1,0,0,1]
//          },{
//              "id":3,
//              "type":"audio",
//               "src":"../../../src/assets/test/test"
//          },
//          {    "id":3,
//              "type":"questionandansur",
//              'text':['one','tow','three','four'],
//              'ubung':['one','tow','three','four']
//          },{
//              "id":4,
//              "type":"fillwithimage",
//              "src":["stift.jpg","buch.jpg","radiergummi.jpg","stuhl.jpg"],
//              "ubung":["stift","buch","radiergummi","stuhl"]
//          },{
//              "id":5,
//            "type":"dialog",
//            "src":["dialog.jpg"],
//            "text":"Ahmad**Anna, kommst du eigentlich aus Deutschland?**Anna**Ja, ich bin hier aufgewachsen, aber geboren bin ich in Russland. Meine Eltern sind von Sankt Petersburg nach Hamburg gezogen, als ich sehr klein war.**Ahmad**Interessant. Wie alt warst du damals?**Anna**Drei Jahre und zehn Monate, also fast vier.**Ahmad**Und kannst du dich an die Zeit in Russland erinnern?**Anna**Nicht wirklich. Ich habe fast alles vergessen.**Ahmad**Das ist schade! Aber du sprichst Russisch, oder?**Anna**Ja, zu Hause haben meine Eltern immer Russisch gesprochen. Also habe ich das auch gelernt. Mein Deutsch ist aber viel besser.**Ahmad**Wieso denn das? Russisch ist doch deine Muttersprache.**Anna**Ja, schon, aber ich bin in Deutschland zur Schule gegangen und studiere jetzt in Leipzig an der Universität. Russisch spreche ich nur in der Freizeit mit Verwandten und Freunden. Viele Wörter kenne ich aber nur auf Deutsch. Deshalb kann ich mich über schwierige Themen in dieser Sprache besser unterhalten.**Ahmad**Das kann ich verstehen. Ich bin nämlich auch zweisprachig aufgewachsen.**Anna**Echt? Das wusste ich gar nicht.**Ahmad**Ja, aber das erzähle ich dir ein anderes Mal. Jetzt muss ich los.**Anna**Alles klar. Dann bis später!"
//          },{
//              "id":6,
//            "type":"dialog",
//            "src":["dialog.jpg"],
//            "text":"Ahmad222**Anna, kommst du eigentlich aus Deutschland?**Anna**Ja, ich bin hier aufgewachsen, aber geboren bin ich in Russland. Meine Eltern sind von Sankt Petersburg nach Hamburg gezogen, als ich sehr klein war.**Ahmad**Interessant. Wie alt warst du damals?**Anna**Drei Jahre und zehn Monate, also fast vier.**Ahmad**Und kannst du dich an die Zeit in Russland erinnern?**Anna**Nicht wirklich. Ich habe fast alles vergessen.**Ahmad**Das ist schade! Aber du sprichst Russisch, oder?**Anna**Ja, zu Hause haben meine Eltern immer Russisch gesprochen. Also habe ich das auch gelernt. Mein Deutsch ist aber viel besser.**Ahmad**Wieso denn das? Russisch ist doch deine Muttersprache.**Anna**Ja, schon, aber ich bin in Deutschland zur Schule gegangen und studiere jetzt in Leipzig an der Universität. Russisch spreche ich nur in der Freizeit mit Verwandten und Freunden. Viele Wörter kenne ich aber nur auf Deutsch. Deshalb kann ich mich über schwierige Themen in dieser Sprache besser unterhalten.**Ahmad**Das kann ich verstehen. Ich bin nämlich auch zweisprachig aufgewachsen.**Anna**Echt? Das wusste ich gar nicht.**Ahmad**Ja, aber das erzähle ich dir ein anderes Mal. Jetzt muss ich los.**Anna**Alles klar. Dann bis später!"
//          },{
//              "id":7,
//              "type":"summary",
//              "src":"../../../src/assets/test/summary.jpg"
//          }]
//          }
//         ]
//        }
 
// ]
export const Context=createContext(null);
const ContextProvider=({children})=>{
    const [myCourses,setMyCourses]=useState([]);
    const [course,setCourse]=useState([]);
    const [lists,setLists]=useState([]);
    const [FR,setFR]=useState([]);
    const [show,setShow]=useState(false);
    const [mach,setMach]=useState(false);
    const [num,setNum]=useState(null)
    const [next,setNext]=useState(null);
    // const [prev,setPrev]=useState();
    const [unterricht,setUnterricht]=useState([]);
    const [ids,setIds]=useState([]);
    const [login,setLogin]=useState(false); 
    const [pathName,setPathName]=useState('/');
    const [finsh,setFinsh]=useState();
    const [lessons,setLessons]=useState([]);
    const [lessonData,setLessonData]=useState([]);
    
    const [message,setMessage]=useState('');
    const [views,setViews]=useState([]);
    const [courses,setCourses]=useState([]);
    const [myCouresData,setMyCoursesData]=useState([]);
    const [maincarousel,setMaincarousel]=useState([]);
   const [coursesCopy,setCoursesCopy]=useState([]);
    const [userInfo,setUserInfo]=useState(null);
    const [word,setWord]=useState('');
    const [update,setUpdate]=useState(false);

    const [loading,setLoading]=useState(true);
    //get the data from database 
    //built function to shaffel the data
    let shaffel=(arr)=>{
        let newArr=[];
        switch (arr.length){
            case 2 : 
             newArr= [1,0];
             break;
            case 3 :
             newArr= [2,0,1];
               break ;
            case 4  : 
             newArr= [3,0,2,1];
               break;
             case 5 : 
             newArr= [3,0,4,1,2] ;
             break;
             default : 
             newArr= [3,0,5,4,1,2];
             break; 
            }
            return newArr;
    }
  let pos=(item)=>{
    //ich muss gebe id from back end to item from database id manual
     //push the item in posi
      return unterricht.indexOf(item);  
  }
  const checkLogin=async (email)=>{
    
    return  await axiosInstance.post('/checklogin',{email},{
              headers: {
                'Content-Type': 'application/json'
              },
            })
     }
     const getData=async()=>{
     
      return await axios.get(`http://127.0.0.1:8000/api/start`);
      }
     const getmycourses=async ()=>{
  
    
        const id=userInfo.id;
      
      return await axios.get(`http://127.0.0.1:8000/api/user/${id}/courses`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    
     }
    useEffect(()=>{
      getData()
      .then(res=>{

            setMaincarousel(res.data.data.slider)
            setCourses(res.data.data.courses)
            setViews(res.data.data.views);  
      }).catch(error=>console.log(error))
      if(localStorage.getItem('id')!=null && localStorage.getItem('email')!=null){
        const email=localStorage.getItem('email');
        const id=localStorage.getItem('id');
   
         checkLogin(email).then(res=>{
          if(id==res.data){
            
            setLogin(true);
            setUserInfo({'id':localStorage.getItem('id'),"email":localStorage.getItem('email')})         
            
          }else{
          localStorage.clear();
          setLogin(false);
          setUserInfo({})
          }
         
         }).catch(error=>console.log(error))
    } 
    },[]);
useEffect(()=>{

  setCoursesCopy([...courses])
},[courses.length])
useEffect(()=>{
     if(userInfo!=null || update){
          getmycourses().then(res=>{
          
          setMyCoursesData(res.data.data);
          }).catch(error=>console.log(error));
     }
     setUpdate(false)
   },[userInfo,update]);
   useEffect(()=>{
    console.log(update)
   },[update])
   useEffect(()=>{

    if(myCouresData.length>0 || update){
  console.log(myCouresData);
      const mycoursesId=myCouresData.map(item=>item.id);
      const coursesfilter=courses.filter(item=>!mycoursesId.includes(item.id));
      setCoursesCopy(coursesfilter)
 
    }else{
      setCoursesCopy([...courses])
    }
    setLoading(false)
   },[myCouresData.length,update])
 
    useEffect(()=>{
      if(course.length>0 ){
        setLessons(course[0].lessons);

      }
    },[course]);
  
 useEffect(()=>{
  if(lessonData.length>0){
    setUnterricht([]);
    lessonData.map(item=>{
      setUnterricht(pre=>[...pre,'<'+item.type[0].toUpperCase().concat(item.type.slice(1))+' id={id} />']);
      setIds(pre=>[...pre,item.number]);
      });
      setNum(lessonData.length); 
      const num=lessonData[lessonData.length-1].number;
      setFinsh(num);
  }else{
    setUnterricht([]);
    setNum(0);
    setFinsh(0);
    setIds([])
  }
 
},[lessonData])
useEffect(()=>{
  console.log(unterricht);
},[unterricht])


const translate=(e)=>{
          setWord(e.target.innerText);
      }
      const spaning=(textTranslate)=>{
          return textTranslate.split(' ').map((item,index)=><span key={index} className='text' onClick={(e)=>translate(e)}>{item} </span>);
      }
useEffect(()=>{
  console.log(lists)
},[lists.length])


const values={
  maincarousel,views,about,
  userInfo,ids,pos,unterricht,shaffel,FR,setFR
  ,show,setShow,mach,setMach,next,
  setNext,num,login,setLogin ,
  pathName,setPathName,lists,setLists,myCourses,myCouresData,setMyCoursesData,courses,
  finsh,setCourse,lessons,setFinsh,lessonData,setLessonData,
  userInfo,setUserInfo,message,setMessage,
  coursesCopy,setCoursesCopy,
  word,setWord,spaning,loading,update,setUpdate
}

    return (<Context.Provider value={values}>{children}</Context.Provider>)
}
export default ContextProvider;