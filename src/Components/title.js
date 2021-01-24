import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../Stylesheets/title.css'
import plus from '../images/plus.png'
import trashcan from '../images/trashcan.png'
import $ from 'jquery'

function Title(){
    const [Countid,SetCountid] = useState(0);
    const [Showtodos,SetShowtodos] = useState([]);
    const [Savetodos,SetSavetodos] = useState({listnum : 0,
        dolist : []});
    useEffect(()=>{
        const axiosConfig = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };
        axios.get('https://chantodo.herokuapp.com/list',axiosConfig)
        .then(response=>{
            var jsontext = response.data.dolist
            var outputarray = [];
            console.log(jsontext)
            if(jsontext===undefined){
                return false;
            }
            else{
                for(let idx=0; idx < jsontext.length; idx++){
                    outputarray.push(jsontext[idx])
                }
            }
            SetShowtodos(outputarray)
            SetSavetodos({listnum:jsontext.length-1,dolist:outputarray})
        })
    },[])
    const checkHandler = (event) =>{
        // 어떤걸 체크했는지 정보를 가져오기 위함
        var paraMatch = event.target.id;
        var checkBox = document.getElementById(paraMatch);
        // 라인긋기
        var paraline = event.target.nextSibling
        console.log(paraMatch)
        console.log(paraline)
            if(checkBox.checked === true){
                paraline.style.textDecoration = "line-through";
            }
            else{
                paraline.style.textDecoration = "none";
            }
    }
    const SaveHandler = () =>{
        var isemptyinput = document.getElementById("todo_list");
        console.log(isemptyinput)
        if(isemptyinput === null){
            // post 통신
            const requestoptions = {
                headers: {"Content-Type": `application/json`},
            }
            axios.post('https://chantodo.herokuapp.com/list',JSON.stringify(Savetodos)
            ,requestoptions)
            .then(()=>{
                alert("저장 성공!")
            })
        }
        else{
            alert("할 일을 작성해주세요")
            return false;
        }
    }
    const removeHandler = (event) =>{
        const delresult = Savetodos.dolist.indexOf(event.target.previousSibling.innerText)
        if(delresult > -1){
            Savetodos.dolist.splice(delresult,1)
        }
        SetCountid(Countid - 1);
    }
    const _addtodo = () => {
        var isinput = document.getElementById("todo_list")
        if(isinput !== null){
            return false;
        }
        else{
            // div 태그 생성
            let divsection = document.createElement("div");
            // 저장버튼 애니메이션
            var appearBtn = $('#submitbtn');
            appearBtn.animate({opacity:'1'},1000);
            // 쓰레기통 아이콘 엘리먼트 생성
            let addtrashcan = document.createElement("img");
            addtrashcan.setAttribute("src",trashcan);
            addtrashcan.setAttribute("alt","trash_can_img");
            addtrashcan.setAttribute("style","width:45px;");
            // 인풋태그 추가
            var tagsection = document.querySelector(".inputTagSection");
            var addtodo = document.createElement("input");
            addtodo.setAttribute("type","text");
            addtodo.setAttribute("id","todo_list");
            addtodo.setAttribute("autocomplete","off");
            addtodo.setAttribute("spellcheck","false");
            addtodo.style.outline = 0;
            tagsection.appendChild(addtodo);

            var para = document.createElement("div");
            var parastr = document.createElement("p");
            // 체크박스 추가
            var chkbox = document.createElement("input");
            chkbox.setAttribute("type", "checkbox");
            chkbox.setAttribute("style","zoom:3.0;");
            chkbox.onclick = checkHandler;
            // 엔터 눌렀을때
            addtodo.addEventListener('keypress', function(event) {
                if (event.which === 13) {
                    console.log(Savetodos)
                    var paraContent = event.target.value;
                    Itershowtodos(paraContent)
                    // div id 셋팅
                    divsection.setAttribute("id",Countid);
                    parastr.innerText = paraContent;
                    parastr.setAttribute("class",paraContent);
                    para.setAttribute("id",Countid);
                    para.setAttribute("class","para");
                    // 체크박스에 id 추가
                    chkbox.setAttribute("id",paraContent);
                    // div에 체크박스 추가
                    para.appendChild(chkbox);
                    // div에 글 추가
                    para.appendChild(parastr);
                    // 쓰레기통 아이콘 id 부여
                    addtrashcan.setAttribute("id",Countid);
                    // 체크박스 추가
                    // 글을 inputtagsection에 추가
                    tagsection.appendChild(para);
                    // 글 옆에 쓰레기통 추가
                    para.appendChild(addtrashcan);
                    // input 탭 제거
                    tagsection.removeChild(addtodo);
                    SetCountid(Countid + 1);
                    const newList = Savetodos.dolist.concat(paraContent)
                    SetSavetodos({...Savetodos,listnum:Countid,dolist:newList})
                }
            });
            addtrashcan.onclick = removeHandler;
        }
    }
    const _Renderer = (Showtodos) =>{
        const paralist = Showtodos.map((arr,index)=>{
            return <Itershowtodos todo={arr}
            idx={index}
            key={index}
            ischeck = {checkHandler}
            remover = {removeHandler}
            />
        })
        return paralist
    }
    return(
        <section id="todos">
            <div className="headtitle">
                <p>오늘 할 일은 무엇인가요?</p>
                <button onClick={_addtodo}>
                    <img src={plus} className="plusimg" alt="plus_img"></img>
                </button>
            </div>
            <div className="inputTagSection">
                {Showtodos ? _Renderer(Showtodos):<p>loading</p>}
            </div>
            <div className="submitSection">
                <button id="submitbtn" onClick={SaveHandler}>저장하기</button>
            </div>
        </section>
    )
}
function Itershowtodos(props) {
    const chkboxstyle={
        zoom: 3.0
    }
    const imgstyle={
        width:'45px'
    }
    const checker = (event) => {
        props.ischeck(event)
    }
    const removelist = (event) => {
        props.remover(event)
    }
    return(
        <div id={props.idx} className="para">
            <input type="checkbox" onClick={checker} style={chkboxstyle} id={props.todo}></input>
            <p className={props.todo}>{props.todo}</p>
            <img src={trashcan} onClick={removelist} alt="trash_can_img" id={props.idx}
            style={imgstyle}></img>
        </div>
    )
}
export default Title;