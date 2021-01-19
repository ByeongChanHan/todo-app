import React, { useState } from 'react'
import '../Stylesheets/title.css'
import plus from '../images/plus.png'
import trashcan from '../images/trashcan.png'
import $ from 'jquery'

function Title(){
    const [Countid,SetCountid] = useState(0);
    const checkHandler = (event) =>{
        // 어떤걸 체크했는지 정보를 가져오기 위함
        var paraMatch = event.path[1].innerText;
        var checkBox = document.getElementById(paraMatch);
        // 라인긋기
        var paraline = event.path[1].childNodes[1];
        console.log(checkBox)
            if(checkBox.checked === true){
                paraline.style.textDecoration = "line-through";
            }
            else{
                paraline.style.textDecoration = "none";
            }
    }
    const _addtodo = () => {
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
                var paraContent = event.target.value;
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
            }
        });
        addtrashcan.addEventListener('click',function() {
           tagsection.removeChild(para);
        })
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

            </div>
            <div className="submitSection">
                <button id="submitbtn">저장하기</button>
            </div>
        </section>
    )
}
export default Title;