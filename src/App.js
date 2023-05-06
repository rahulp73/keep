import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faPlus,faBars, faXmark, faNoteSticky, faTrashCan, faUser, faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import './App.css';
import { useState,useEffect } from 'react';

function App() {

  const dict = [{id: 1, note : 'Rules are not the important bit, though. The movie is less about time, and more about life - about relishing little joys in it that our worried and hurried minds fail to notice.'}, 
  {id : 2, note : 'Lesson Number One: All the time traveling in the world cant make someone love you.'}, 
  {id : 3, note : `I know you've probably suspected this, but over the last month, I've fallen completely in love with you. Now, obviously this was going to happen because you're a goddess with that face, and that hair. But even if you didn't have a nice face, and even if you had absolutely no hair because of some bizarre medical reason, I'd still adore you. And I wondered if, by any chance, you might share my feelings?`},
  {id : 4, note : 'Theres a song by Baz Luhrmann called Sunscreen. He says worrying about the future is as effective as trying to solve an algebra equation by chewing bubble gum. The real troubles in your life will always be things that never crossed your worried mind.'},
  {id : 5, note : 'And in the end I think Ive learned the final lesson from my travels in time; and Ive even gone one step further than my father did. The truth is I now dont travel back at all, not even for the day. I just try to live every day as if Ive deliberately come back to this one day, to enjoy it, as if it was the full final day of my extraordinary, ordinary life.'},
  {id : 6, note : 'We are all traveling through time together, every day of our lives. All we can do is do our best to relish this remarkable ride.'},
  {id : 7, note : `I always asked myself what could I do to make you smile and be happy, you are one of the strongest people I know, yet so fragile and precious. Of course, We didn't talk much and we may have had small talks but I enjoyed each and every one of them.`}];
  // UseStates
  const [searchValue, setSearchValue] = useState("");
  const [takeANoteValue, setTakeANoteValue] = useState("")
  const [toggle, setToggle] = useState(true)
  const [Notes,setNotes] = useState(dict)
  const [DeletedNotes,setDeletedNotes] = useState([])
  const [ModalState,setModelState] = useState(false)
  const [ModalText,setModalText] = useState('')
  const [Tabs, setTabs] = useState(true)
  const [ProfileState, setProfileState] = useState(false)

  // UseEffect
  useEffect(() => {
      const close = (e) => {
        if(e.key === 'Escape'){
          falseModalState()
        }
      }
      window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  },[])

  //Changing Values Function
  const searchChange = (event) => {
    setSearchValue(event.target.value);
  }
  const takeANoteValueChange = (event) => {
    setTakeANoteValue(event.target.value)
  }
  const toggleClass = () => {
    setToggle(!toggle)
  }
  const falseModalState = ()=>{
    setModelState(false)
  }
  const trueModalState = (event) =>{
    setModelState(true)
    setModalText(event.target.textContent)
  }
  const ModalTextChange = (event) => {
    setModalText(event.target.textContent)
  }

  // Clearing Functions
  const clearFunction = () => {
    setSearchValue("");
  }
  const clearTakeANoteValue =  () => {
    setTakeANoteValue("")
  }
  const removeNote = (id)=>{
    let DummyNotes = Notes.filter((Note)=>{
      return Note.id!==id
    })
    let DelNotes = Notes.filter((Note) => {
      return Note.id === id
    })
    setDeletedNotes([...DeletedNotes,...DelNotes])
    setNotes(DummyNotes)
  }
  const filteringNotes = (Note) => {
    if(Note.note.toLowerCase().includes(searchValue.toLowerCase())){
      return Note
    }
  }
  const searchedNotes = Notes.filter(filteringNotes)
  const removeDeletedNotes = (id) => {
    var DeleNotes = DeletedNotes.filter((Note) => {
      return Note.id !== id
    })
    setDeletedNotes(DeleNotes)
  }

  //Functions
  const AddNote = ()=>{
    setNotes([...Notes,{id : (Math.floor(Math.random() * 100) + 7),note : takeANoteValue.trimEnd()}])
    setTakeANoteValue('')
    console.log(Notes)
  }
  return (
    <div className="App">
      <nav className='NavBar'>
        <div className='HamBurger Clickable' onClick={toggleClass}><FontAwesomeIcon icon={ faBars } /></div>
        <div className='DisplayPicture'>DisplayPicture</div>
        <div className='SearchBar'>
          <div className='SearchIcon Clickable'><FontAwesomeIcon icon={ faMagnifyingGlass } /></div>
          <input type='text' placeholder='Search' className='TextField' value={searchValue} onChange={ searchChange }></input>
          <div className='TextClear Clickable' onClick={ clearFunction }><FontAwesomeIcon icon={ faXmark } /></div>
        </div>
        <div className="Hud">
          <div className="ProfilePic" onClick={() => setProfileState(!ProfileState)}><img src="https://uploads.turbologo.com/uploads/design/hq_preview_image/5097676/draw_svg20210617-26747-23281c.svg.png" alt="Google"/></div>
        </div>
        <div className={`sub-menu-wrap ${ProfileState? 'sub-menu-wrap-400' : 'sub-menu-wrap-zero'}`}>
          <div className='sub-menu'>
            <div className='user-info'>
              <img src='https://uploads.turbologo.com/uploads/design/hq_preview_image/5097676/draw_svg20210617-26747-23281c.svg.png' alt="ProfilePic"/>
              <h2>Rahul</h2>
            </div>
            <hr/>
            <a href="#" className="sub-menu-link">
              <div><FontAwesomeIcon icon={faUser} /></div>
              <p>Edit Profile</p>
              <span>{`>`}</span>
            </a>
            <a href="#" className="sub-menu-link">
              <div><FontAwesomeIcon icon={faArrowRightFromBracket} /></div>
              <p>Log Out</p>
              <span>{`>`}</span>
            </a>

          </div>
        </div>
      </nav>
      <div className="LowerHalf">
        <div className={`Tabs-${toggle? "active" : "notActive"}`}>
          <div className={`${toggle? 'TabsNotes' : 'TabsNotes-notActive'} ${toggle? 'TabsRound' : ''} ${Tabs? 'TabsActive' : ''}`} onClick={() => setTabs(true)}>
            <div className={`TabsNotesSticky ${toggle? '' : 'TabsCircle'}`}><FontAwesomeIcon icon={ faNoteSticky } /></div>
            <div className='TabsNotesStickyText' style={{display : `${toggle? 'inline-flex' : 'none' }`}}>Notes</div>
          </div>
          <div className={`${toggle? 'TabsBin' : 'TabsBin-notActive'} ${toggle? 'TabsRound' : ''} ${Tabs? '' : 'TabsActive'}`} onClick={() => setTabs(false)}>
            <div className={`TabsBinTrash ${toggle? '' : 'TabsCircle'}`}><FontAwesomeIcon icon={ faTrashCan } /></div>
            <div className='TabsBinTrashText' style={{display : `${toggle? 'inline-flex' : 'none' }`}}>Trash</div>
          </div>
        </div>
        <div className={`${toggle? 'Notes' : 'Notes-notActive'}`}>
          {
            (searchValue.length===0) && (Tabs===true) && (<div className='TakeaNote'>
              <div className='NoteText'>
                <input type='text' placeholder='Take a Note...' className='TakeNoteInput' value={ takeANoteValue } onChange={ takeANoteValueChange }></input>
                <div className={`${(takeANoteValue.length>0)? 'AddNote' : 'Hidden'} Clickable`} onClick={AddNote}><FontAwesomeIcon icon={faPlus} /></div>
                <div className={`${(takeANoteValue.length>0)? 'TextClear' : 'Hidden'} Clickable`} onClick={clearTakeANoteValue}><FontAwesomeIcon icon={ faXmark } /></div>
              </div>
            </div>)
          }
          <div className='NotesTaken'>
                {
                  (searchValue.length>0) && (searchedNotes.map((element)=>{
                    return (
                      <div className='Note' key={element.id}>
                        <div className='InnerText' onClick={trueModalState}>{element.note}</div><hr/>
                        <div className="Controls"><div className="Clickable" onClick={() => {removeNote(element.id)}}><FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon></div></div>
                      </div>
                    )
                  }))
                }
                {
                  (searchValue.length===0) && (Tabs===true) && (Notes.length<=0? <p style={{fontSize:'3rem'}}>Write a Note</p> : Notes.map((element)=>{
                    return (
                    <div className='Note' key={element.id}>
                      <div className='InnerText' onClick={trueModalState}>{element.note}</div><hr/>
                      <div className="Controls"><div className="Clickable" onClick={() => {removeNote(element.id)}}><FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon></div></div>
                    </div>)
                  }))
                }
                {
                  (searchValue.length===0) && (Tabs===false) && (DeletedNotes.length<=0? <p style={{fontSize:'3rem'}}>Trash Is Empty</p> : DeletedNotes.map((element)=>{
                    return (
                    <div className='Note' key={element.id}>
                      <div className='InnerText' onClick={trueModalState}>{element.note}</div><hr/>
                      <div className="Controls"><div className="Clickable" onClick={() => {removeDeletedNotes(element.id)}}><FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon></div></div>
                    </div>)
                  }))
                }
                <div className='ModalContainer' style={{display : `${ModalState? 'block' : 'none' }`}}>
                  <div className='Modal'>
                    <div className='ModalContent' suppressContentEditableWarning={true} contentEditable={true} onChange={ModalTextChange}>
                      {ModalText}
                    </div><hr/>
                    <div className='ModalFooter'>
                      <div className='ModalClose' onClick={falseModalState}>Close</div>
                    </div>
                  </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
