  
import React,{useState,useEffect} from "react"
import { connect } from "react-redux";
// import ReactTable from 'react-table-6';
// import 'react-table-6/react-table.css';
import { createStructuredSelector } from "reselect";
import { selectExcelData } from "../../../Redux/ExcelData/excel-data.selectors.js";
import {tableIcons } from "./TableIcons.js"
import MaterialTable from "material-table"
import { RemoveCircleOutlineOutlined as RemoveCircleIcon } from '@material-ui/icons';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { setRow } from "../../../Redux/SelectedRowandColumn/tableSelections.actions.js";
import { setExcelData, setExcelDataColumns } from "../../../Redux/ExcelData/excel-data.actions.js";
import $ from "jquery"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { decreaseNumberOfInputsGreaterThan2, decreaseProgressLength, increaseNumberOfInputsGreaterThan2, increaseProgressLength, setCodes, setFilteredData, setSelectedRows } from "../../../Redux/CodeitData/codeit-data.actions.js";
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { socket } from "../../../config"
import axios from "axios"
import { selectShowCodedAs } from "../../../Redux/Show_Coded_As/Show_Coded_As.selectors.js";
import { selectContainsKeyword } from "../../../Redux/ContainsKeyword/ContainsKeyword.selectors.js";
import { ContextMenu, MenuItem as ContextMenuItem, ContextMenuTrigger } from 'react-contextmenu'
import { userActions } from "../../../_actions/index.js";
import { selectFilters ,selectSubmitFilters} from "../../../Redux/Filters/Filters.selectors.js";
import { setSubmitFilters } from "../../../Redux/Filters/Filters.actions.js";
import { selectFilteredData } from "../../../Redux/CodeitData/codeit-data.selectors.js";
import hotkeys from 'hotkeys-js';


const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }))(LinearProgress);

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      paddingRight:'20px',
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
let __data=[
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "I really like the show because it is thought provoking and i like shows that make me think",
      "YAKE Prediction": "thought provoking/really like/provoking/like/really"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "The cast.",
      "YAKE Prediction": "cast"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "Nothing",
      "YAKE Prediction": "nothing"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "It is the most complex and original idea I have ever seen or heard of. Also, because it delves into the topic of human emotions, but in an artificial way, if I were to be punny and serious all at once. From what I have seen of the show, I believe that we, as human beings, can compare ourselves to the androids, because we can definitely relate to them.",
      "YAKE Prediction": "original idea/ever seen/artificial way/human emotions/complex"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "it has many twists and I like that",
      "YAKE Prediction": "many twists/twists/many/like"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "It's unpredictable so you are left wanting more",
      "YAKE Prediction": "left wanting/unpredictable/left/wanting"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "thrilling and a very exciting show with action",
      "YAKE Prediction": "exciting show/thrilling/action/show with action/exciting"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "It is a very unique show and I never know what to expect next",
      "YAKE Prediction": "unique show/show/unique/expect next/next"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "Its visually interesting",
      "YAKE Prediction": "visually interesting/visually/interesting"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "love anything ed harris or thandie newton are in",
      "YAKE Prediction": "love anything/thandie newton/love/anything/harris"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "The acting and writing are amazing and it has a great story",
      "YAKE Prediction": "great story/story/acting/writing/amazing"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "Westworld is a complete show, from start to finish, its plot keeps you interested and intrigued by what may happen. It has a unique theme and plot in my opinion, combining in a great way the genre of science fiction with the drama and problems that afflict us today.",
      "YAKE Prediction": "complete show/may happen/plot keeps/westworld/show"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "Its different than the other show I watch",
      "YAKE Prediction": "watch/different/show"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "how they try and make a new way to be different then others",
      "YAKE Prediction": "new way/others/different then others/try/make"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "I like the subject.",
      "YAKE Prediction": "subject/like the subject/like"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "The overall futuristic concept of living in that (simulated) time period. The characters are all engaging and support their individual and collective agandas with determination and steadfastness.",
      "YAKE Prediction": "overall futuristic concept/time period/overall futuristic/futuristic concept/simulated"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "Than you.",
      "YAKE Prediction": ""
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "I like the action and parts in which they get killed by the bad guy",
      "YAKE Prediction": "bad guy/get killed/guy/like/action"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "love the complexity of characters and how it makes you think critically",
      "YAKE Prediction": "think critically/love/critically/love the complexity/complexity"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "The aspect of the show that revolves around what makes people humans. The acting is also great.",
      "YAKE Prediction": "makes people humans/people humans/revolves around/makes people/humans"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "The characters",
      "YAKE Prediction": "characters"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "THE CHARACTERS",
      "YAKE Prediction": "characters"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "I absolutely love the scenery and the music. The music is best in show, best in class. I've always been an Evan Rachel Wood fan and she carries the series very well. The overall tense and somber mood is drawing for me. I'm always excited to see what lurks behind each episode.",
      "YAKE Prediction": "evan rachel wood/absolutely love/love the scenery/rachel wood fan/evan rachel"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "it is very good",
      "YAKE Prediction": "good"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "Westworld is a drama series of a darkodyssey about the dawn of artificial and evolution of sin",
      "YAKE Prediction": "drama series/westworld/sin/evolution of sin/drama"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "Nothing else",
      "YAKE Prediction": "nothing else/nothing/else"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "the AI and sci-fi storyline and some of the characters",
      "YAKE Prediction": "sci/characters/storyline"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "I don't love love it. Too violent",
      "YAKE Prediction": "love love/love/violent"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "not sure it is very confusing now",
      "YAKE Prediction": "sure/confusing"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "I like that it have a virtual reality setting where the character can go to any setting of the time line to protect there friend",
      "YAKE Prediction": "virtual reality setting/virtual reality/time line/reality setting/friend"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "its full of twists",
      "YAKE Prediction": "twists/full of twists/full"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "Complex story line, artificial intelligence",
      "YAKE Prediction": "complex story line/artificial intelligence/complex story/story line/complex"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "I really liked the first season. I'm not too impressed with the rest. I guess I keep comparing it to the original movie, which I really liked.",
      "YAKE Prediction": "first season/really liked/season/really/liked"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "Its a show my friends recommended to me and I started watching.",
      "YAKE Prediction": "friends recommended/show/friends/recommended/started watching"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "It doesnt",
      "YAKE Prediction": ""
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "the story of the show is very engaging",
      "YAKE Prediction": "engaging/story/show"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "it is a binge worry",
      "YAKE Prediction": "binge worry/worry/binge"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "Futuristic Scifi, AI, sentience/consciousness, what is life? what is real? revealing the wider world beyond the parks (and the other parks), the architecture",
      "YAKE Prediction": "futuristic scifi/scifi/sentience/consciousness/futuristic"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "The artificial intelligence aspect and Jeffrey wright",
      "YAKE Prediction": "jeffrey wright/artificial intelligence aspect/artificial intelligence/intelligence aspect/jeffrey"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "is very good",
      "YAKE Prediction": "good"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "interesting plot, interest to see how reality and 'fiction' merge in the show",
      "YAKE Prediction": "interesting plot/fiction/interesting/plot/interest"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "Engaging",
      "YAKE Prediction": "engaging"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "It a how that goes beyond the typical sci-fi story and tells the side of machine trying to survive and gain it's on identity.",
      "YAKE Prediction": "typical sci/goes beyond/machine trying/sci/identity"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "It has very good acting and plot lines I'm always surprised by",
      "YAKE Prediction": "plot lines/good acting/lines/good/acting"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "What draws me to Westworld is the thrill and excitement of every scene. I like the unexpected plot twists and how characters form bonds with one another. It is a good show because of the complex plot and the intrigue of its characters",
      "YAKE Prediction": "every scene/westworld/unexpected plot twists/characters form bonds/scene"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "I like the plot of the show",
      "YAKE Prediction": "like the plot/show/like/plot"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "The plot twists and expanding further into the westworld universe",
      "YAKE Prediction": "westworld universe/plot twists/universe/plot/twists"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "The entire concept of AI and alternate realities interests me.",
      "YAKE Prediction": "alternate realities interests/entire concept/alternate realities/realities interests/entire"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "Good show to fall asleep to.",
      "YAKE Prediction": "good show/show to fall/fall asleep/good/show"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "The story is amazing for starters. The acting is top notch, the story telling is awesome and the overall show is wild fun.",
      "YAKE Prediction": "story telling/story/starters/top notch/wild fun"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "the mistrey",
      "YAKE Prediction": "mistrey"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "Comparing the original version to the new version",
      "YAKE Prediction": "original version/new version/comparing/version/comparing the original"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "It's storyline. The show is very right for today. Culturuly. It touches on alot of topics that are taboo",
      "YAKE Prediction": "storyline/culturuly/today/show/right"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "i like the thriller of it , the plots i can't wait to see how it pans out and the hero's that make the show",
      "YAKE Prediction": "wait/hero/show/wait to see/make the show"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "I enjoyed the futuristic story lines, AI, Characters in all 3 seasons, but season 3 is too complex.",
      "YAKE Prediction": "futuristic story lines/story lines/futuristic story/characters/lines"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "the cast in the show & the overall storylines/concept draws me into this show. This is a storyline that i feel like we will be living in the not to distant future",
      "YAKE Prediction": "overall storylines/concept draws/show/storylines/concept"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "i like the story",
      "YAKE Prediction": "story/like the story/like"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "nudity",
      "YAKE Prediction": "nudity"
  },
  {
      "Q148 What, if anything, about Westworld draws you into this show and makes you want to watch? What makes it a good show? (Please be as detailed and complete as possible in your reply.)": "The writing is great. When this show originally aired I felt as though it hit a new exciting way to portray the future and the possibilities of a fully human-like AI. And one my favorite parts is how they incorporate the songs (for example, Paint it Black) into the soundtrack to the show, but played on an old time piano, or the background music to a scene. Its so clever and once I picked it up its something I look forward to every episode.",
      "YAKE Prediction": "show originally aired/new exciting way/great/old time piano/fully human"
  }
]

  const attributes = {
    className: 'custom-root',
    // disabledClassName: 'custom-disabled',
    // dividerClassName: 'custom-divider',
    // selectedClassName: 'custom-selected'
  }
const ContextMenuSkin=({slice,select,data,handleClick})=>{
    var __num= Math.floor(Math.random() * 101)  
    // slice && console.log(data)
    let temp1=data
    let start=0
    return (
        <div >
         <ContextMenuTrigger id={__num.toString()}>
            {slice && temp1?.indices && temp1?.indices.map(item =>{
                return(
                        <p>
                            {temp1.desc.slice(start,item.fIndex)}
                        
                            <span style={{color:"red"}}>{temp1.desc.slice(item.fIndex,item.lIndex+1)}</span>

                            <p style={{display:"none"}}>{start=item.lIndex+2}</p>
                        </p>
                )
            })
            }
            {slice && !data?.indices && <p style={{textAlign: "center"}} >{select}</p> }
            {!slice && <p style={{textAlign: "center"}} >{select}</p>}
            </ContextMenuTrigger>
            <ContextMenu id={__num.toString()}>
                <ContextMenuItem
                  className="input_value_in_dropdown"
                  data={{ action: [data] }}
                  onClick={handleClick}
                  attributes={attributes}
                >
                 Sample Context Item
                </ContextMenuItem>
            </ContextMenu>
        </div>
    )
}
const CodeItTable =({filteredData,setFilteredData,setSubmitFiltersInRedux,selectSubmitFiltersFromRedux,selectFiltersFromRedux,setExcelData,selectContainsKeyword,selectShowCodedAs,excelData,setRow,setExcelDataColumns,decreaseNumberOfInputsGreaterThan2,increaseNumberOfInputsGreaterThan2,setCodesinRedux,decreaseProgressLength,increaseProgressLength})=>{

        let customCol=[
        {
            title:`ID`,
            field:`resNum`,
            cellStyle: {
                width:"2%",
            },
            render: rowData => <ContextMenuSkin select={rowData?.resNum} data={rowData} handleClick={handleClick} />
        },
        {
            title:`desc`,
            field:`desc`,cellStyle: {
                width:"60%",
            },
            render: rowData => <ContextMenuSkin slice={true} select={rowData?.desc} data={rowData} handleClick={handleClick} />
        },{
            title:`length`,
            field:`length`,
            cellStyle: {
                width:"2%",
            },
            render: rowData => <ContextMenuSkin select={rowData?.length} data={rowData} handleClick={handleClick} />
        },{
            title:"Codes",
            field:"Codes",cellStyle: {
                textAlign: "-webkit-center",
                width:"23%",
            },
            render: rowData => <input onChange={handleCodes(rowData)} value={codes[rowData?.resNum]} type="text"/>
        },
    ]

    let tempData=(JSON.parse(localStorage.excelData))

    
    let transformedData=tempData
    transformedData.map((item,index)=>{
        let keys = Object.keys(transformedData[index])
        if(item[keys[0]]?.length > 30){
            item[keys[0]]=`${item[keys[0]].slice(0,30)} ....`
        }
    })

    let mapper={}
    let i=0
    for ( i=0 ; i<transformedData?.length;i++){mapper[i]=[]}

    const [keywords,setkeywords]=useState(mapper)
    const [codes,setCodes]=useState(mapper)
    var prev=0,next=0

    useEffect(()=>{
        socket.once('input-box',({num ,value}) => {
            // if(codes[num]!=value){
            // console.log(prev<next)
            if(prev<next){
                setCodes({...codes,[num] : value})
                prev=prev+1
                console.log({num ,value})
            }
            // }else{
            //     prev=prev-0.5
            // }
        })
        socket.once('keywords', ({num ,value}) => {
            if(keywords[num]!==value){
                setkeywords({...keywords,[num] : value})
                keywords[num]===value && console.log("same")
            }
        })
    })

  const handleCodes=rowData=>(event)=>{
    let value =event.target.value;
    // let num=rowData.tableData.id
    let num=rowData?.resNum
    // rowData?.resNum
    next=next+2
    socket.emit('input-box',{num,value})
  }
  
const handleClick=(event, data) => {
    console.log(`clicked`, { event, data })
  }

        // const [filteredData,setFilteredData]=useState([])

        // useEffect (()=>{
        //     if(selectShowCodedAs?.id[0]?.toString() !==`undefined`)
        //     {
        //     let transformedData=tempData
        //     console.log(filteredData)
        //     let ind =[]
        //     Object.keys(codes).map((item,index)=>{
        //         if(typeof(codes[index])==="string"){
        //             if(codes[index]?.split(';').indexOf(selectShowCodedAs?.id[0]?.toString())!==-1){
        //                 ind.push(index)
        //         }
        //         }
        //     })

        //     let finalData=[]
        //     let finalCodes=[]
        //     Object.keys(transformedData).map((item,index)=>{
        //         if(ind.includes(index)){
        //             finalData = [...finalData ,(transformedData[index]) ]
        //             let _te =codes[index]
        //             finalCodes={...finalCodes,[index-1]:_te }
        //     }})

        //     ind.map((index)=>{
        //         let _te =codes[index]
        //         finalCodes={...finalCodes,[index-1]:_te }
        //     })

        //     setFilteredData(finalData)
        //     setCodes(finalCodes)
        //     // console.log(filteredData)
        //     console.log(codes)}
        // },[selectShowCodedAs])
        // useEffect(()=>{
        //     // console.log(selectContainsKeyword)
        //     if(selectContainsKeyword)
        //     {
        //     let data= tempData
        //     let _index =[]
        //     let finalData=[]
        //     data.map((item,index)=>{
        //         if(item[Object.keys(data[0])[0]]?.split(' ').includes(selectContainsKeyword?.code[0])){
        //             // console.log(item)
        //             finalData = [...finalData ,(item) ]
        //             _index.push(index)
        //     }})
        //     let editCodes ={}
        //     _index.map((item,index)=>{
        //         editCodes={...editCodes,[index]:codes[item]}
        //     })
        //     // console.log(finalData,editCodes)
        //     setFilteredData(finalData)
        //     setCodes(editCodes)
        //     }else{
        //         setFilteredData(tempData)
        //     }

        // },[selectContainsKeyword])

        const [reachedEnd,setReachedEnd]=useState(false)

        const ChooseData =()=>{
            if(filteredData?.length==0){
                if(selectContainsKeyword || selectShowCodedAs){
                    return true
                }else{
                    return false
                }
            }else{
                return true
            }
        }
        useEffect(() => {
            ChooseData()
        }, [selectContainsKeyword,filteredData])

        var _index=[]
        const handleRowSelections =(rows)=>{
            _index.map((item,index)=>{
                if($(`tr:nth-child(${(item+1)})`).hasClass(`selectedRow`)){
                    console.log($(`tr:nth-child(${(item+1)})`).hasClass(`selectedRow`))
                    $(`tr:nth-child(${(item+1)})`).removeClass(`selectedRow`,function() {
                        console.log(`insode`)
                      });
                }
            })
            _index.length =0
            rows.map((item,index)=>{
                _index.push(item.tableData.id)
                $(`tr:nth-child(${(item.tableData.id+1)})`).removeClass("selectedRow");
            })
            _index.map((item,index)=>{
                $(`tr:nth-child(${(item+1)})`).addClass("selectedRow");
                $("#root > div > div > div > div > div.dash.codeit_dash > div.codeit_rightmenu_ > div.codeit_rightmenu > div > div > div.MuiToolbar-root.MuiToolbar-regular.MTableToolbar-root-20.MTableToolbar-highlight-21.MuiToolbar-gutters > div.MTableToolbar-title-24 > h6")
                .css("color","white")
            })
            if(_index?.length ===0){
                console.log(_index,_index?.length)
                $("#root > div > div > div > div > div.dash.codeit_dash > div.codeit_rightmenu_ > div.codeit_rightmenu > div > div > div.MuiToolbar-root.MuiToolbar-regular.MTableToolbar-root-20.MuiToolbar-gutters > div.MTableToolbar-title-24 > h6")
                .css("color","")
            }
        }

        let data=null
        const [pageCount,setPageCount]=useState(2)
        const [filteredPageCount,setFilteredPageCount]=useState(2)

        const handleScroll = async (e) => {
            e.preventDefault()
            var temp1=(Math.round((e.target.scrollHeight - e.target.scrollTop)/100)*100)
            const bottom = temp1 ===  (Math.round(((e.target.clientHeight)+100)/100)*100 )
            bottom && console.log(`bottom from handleScroll`,bottom)
            //       console.log(temp1)
            //       console.log(Math.round((e.target.clientHeight * 2)/100)*100)
            // console.log(Math.round(e.target.scrollHeight - e.target.scrollTop)+10 === e.target.clientHeight)
            
            if (bottom) {
              setReachedEnd(true)
              
              return
            }
            else{
              setReachedEnd(false)
              return
            }
          }

        useEffect(async () => {
            console.log(`reached end useEfext`)
            if(reachedEnd &&  (typeof(selectFiltersFromRedux?.searchValue) ===`undefined` || selectFiltersFromRedux?.searchValue?.length==0) ){
                console.log(`load Data end reached`)
                data = ( await userActions.responsePagination({pageNumber:pageCount,limit:20,push:false}))
                data=JSON.parse(data)
                if(filteredData.length > 0 && data!==`undefined`){
                    setFilteredData([...filteredData,...data])
                }else{
                    data!==`undefined` && setFilteredData([...transformedData,...data])
                }
                setPageCount(pageCount+1)

            }else if(reachedEnd && selectFiltersFromRedux?.searchValue?.length > 0){
                console.log(`load filtered Data end reached`)
                data =await userActions.filteredPagination({pageNumber:filteredPageCount,limit:20,filters:getFiltersArray(selectFiltersFromRedux?.searchValue)})
                data=JSON.parse(data)
                console.log(`data from reached end filtered useEffect`,data)
                setSubmitFiltersInRedux(false);
                if(filteredData.length > 0 && data!==`undefined`  && data!==null){
                    setFilteredData([...filteredData,...data])
                }
                setFilteredPageCount(filteredPageCount+1)
            }
        }, [reachedEnd])
        
      

        const getFiltersArray=(_string)=>{
            let filters =[]
            if(selectFiltersFromRedux?.match===`Exact Match`){
                filters.push({"filter":6,"pattern":_string})
            }else if(selectFiltersFromRedux?.match===`Contains In`){
                filters.push({"filter":5,"pattern":_string})
            }
            console.log(filters)
            return filters
        }

        useEffect(() => {
            const intervalId = setInterval(() => {  //assign interval to a variable to clear it.

                $("#root > div > div > div > div > div.dash.codeit_dash > div.codeit_rightmenu_ > div.codeit_rightmenu > div > div > div.Component-horizontalScrollContainer-27 > div > div > div").css("height", "50vh");
                $("#root > div > div > div > div > div.dash.codeit_dash > div.codeit_rightmenu_ > div.codeit_rightmenu > div > div > div.Component-horizontalScrollContainer-27 > div > div").css("margin-top", "-10px");

            },1)    // , 1000*1
              return () => clearInterval(intervalId); //This is important
        })

        useEffect(() => {
            $("#root > div > div > div > div > div.dash.codeit_dash > div.codeit_rightmenu_ > div.codeit_rightmenu > div > div > div.Component-horizontalScrollContainer-27 > div > div").scroll(handleScroll)
            
        })
        hotkeys('ctrl+f, command+f', function(e) {
            e.preventDefault()
            $("#root > div > div > div > div > div.dash.codeit_dash > div.codeit_rightmenu_ > div.codeit_rightmenu > div > div > div.MuiToolbar-root.MuiToolbar-regular.MTableToolbar-root-20.MuiToolbar-gutters > div.MuiFormControl-root.MuiTextField-root.MTableToolbar-searchField-25 > div > input")
            .focus();
        });

        const [selectedRow, setSelectedRow] = useState(null);
        const constPathColors = {
            1: '#FFFF00',
            2: '#FFFF33',
            3: '#FFFF66',
            4: '#FFFF99',
            5: '#FFFFCC'
          };
         return(
            <div className="table-container"   onScroll={handleScroll}>
                    {filteredData!==null && <MaterialTable
                        // style={{"maxHeight":"480px","overflowY":"auto"}}
                        icons={tableIcons}
                        data={filteredData}
                        columns={customCol}
                        title="Coding Tool"
                        // options={{
                        //     rowStyle: rowData => ({
                        //       backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
                        //     }),
                        // }}
                        // options={{ headerStyle: { position: 'sticky', top: "-20px"} }}
                        onSelectionChange={(handleRowSelections)}
                        options={{
                            rowStyle: rowData => {
                                console.log(rowData)
                            }
                        }}
                        // onSelectionChange={e=>{console.log(e);}}
                        onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
                        options={{
                          selection: true,
                          exportButton: true,
                          filtering: false,
                          grouping: false,
                          search: true,
                          sorting: true,
                          paging:false
                        }}
                        localization={{
                          pagination: {
                            labelDisplayedRows: '{from}-{to} of {count}',
                            labelRowsSelect: 'Rows Per Page',
                            labelRowsPerPage: 'Rows Per Page',
                            firstAriaLabel: 'First Page',
                            firstTooltip: 'First Page',
                            previousAriaLabel: 'Previous Page',
                            previousTooltip: 'Previous Page',
                            nextAriaLabel: 'Next Page',
                            nextTooltip: 'Next Page',
                            lastAriaLabel: 'Last Page',
                            lastTooltip: 'Last Page'
                          }
                        }}
                        
                    />}
            </div>
         )
     }

const mapStateToProps=createStructuredSelector({
    excelData:selectExcelData,
    selectShowCodedAs:selectShowCodedAs,
    selectContainsKeyword:selectContainsKeyword,
    selectFiltersFromRedux:selectFilters,
    selectSubmitFiltersFromRedux:selectSubmitFilters,
    filteredData:selectFilteredData,
})
const mapDispatchToProps = dispatch => ({
    setRow: collectionsMap => dispatch(setRow(collectionsMap)),
    setExcelDataColumns: collectionsMap => dispatch(setExcelDataColumns(collectionsMap)),
    setExcelData: collectionsMap => dispatch(setExcelData(collectionsMap)),
    setSubmitFiltersInRedux: collectionsMap => dispatch(setSubmitFilters(collectionsMap)),
    setFilteredData: collectionsMap => dispatch(setFilteredData(collectionsMap)),
    
});
export default connect(mapStateToProps,mapDispatchToProps)(CodeItTable)
