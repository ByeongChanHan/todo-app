import React from 'react'
import '../Stylesheets/title.css'
import plus from '../images/plus.png'
import trashcan from '../images/trashcan.png'
import $ from 'jquery'

function Title(){
    const _addtodo = () => {
        var appearBtn = $('#submitbtn');
        appearBtn.animate({opacity:'1'},1000);
        var tagsection = document.getElementsByClassName("inputTagSection")[0];
        var addtodo = document.createElement("input");
        addtodo.setAttribute("type","text")
        addtodo.setAttribute("id","todo_list");
        addtodo.addEventListener('keypress', function(event) {
            if (event.which === 13) {
                let addtrashcan = document.createElement("img")
                addtrashcan.setAttribute("src",trashcan)
                addtrashcan.setAttribute("alt","trash_can_img")
                addtrashcan.setAttribute("id",event.target.value)
                addtrashcan.setAttribute("style","width:30px; opacity:0")
                tagsection.appendChild(addtrashcan)
            }
        });
        tagsection.appendChild(addtodo)
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