import { notesService } from '../services/note.service.js'
import { eventBus, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

import noteFilter from '../cmps/note-filter.cmp.js'
import noteAdd from '../cmps/note-add.cmp.js'
import noteList from '../cmps/note-list.cmp.js'
import noteArchive from '../cmps/note-archive.cmp.js'
import noteBin from '../cmps/note-bin.cmp.js'
import noteToRemind from '../cmps/note-to-remind.cmp.js'

export default {
    template:`
    <section class="note-app">
            <note-filter v-if="userSectionChose('all')"></note-filter>
            <note-add v-if="userSectionChose('all')" @saved="addNote"></note-add>
            <note-list v-if="userSectionChose('all')" :notesPinned="notesPinned" :notesOther="notesOther"></note-list>
            <note-bin :bin="bin" v-if="userSectionChose('bin')"></note-bin>
            <note-archive :archive="archive" v-if="userSectionChose('archive')"></note-archive>
            <note-to-remind :reminder="reminder" v-if="userSectionChose('remined')"></note-to-remind>
        </section>
    `,
    props:['asideChose'],
    data() {
        return {
            allNotes: [],
            notesPinned: [],
            notesOther: [],
            filterBy: '',
            bin: [],
            reminder: [],
            archive: [],
            
            
        }
    },
    created(){
        
        notesService.query()
            .then(notes => { 
                this.allNotes = notes
                this.notesPinned = notes.filter(note => note.isPinned)
                this.notesOther = notes.filter(note => !note.isPinned)
                this.reminder = notes.filter(note => note.toRemined)
                this.archive = notes.filter(note => note.toArchive)
                this.bin = notes.filter(note => note.toBin)
                
            })
        
        eventBus.on('deleteNote', this.deleteNote)
        eventBus.on('pin-note', this.pinNote)
        eventBus.on('filter-notes', this.filterNotes)
        eventBus.on('change-note-color', this.changeNoteColor)
        eventBus.on('duplicate-note', this.duplicateNote)
        eventBus.on('add-to-reminder', this.addToReminder)
        eventBus.on('addToArchive', this.addToArchive)
    },
    methods: {
        addNote(){
            notesService.query()
            .then(notes => {
                const regex = new RegExp(this.filterBy,'i')
                let fNotes = notes.filter(note => regex.test(note.info.title))
       
                this.allNotes = notes
                this.notesPinned = fNotes.filter(note => note.isPinned)
                this.notesOther = fNotes.filter(note => !note.isPinned)

            })
        },
        deleteNote(noteId){
            notesService.get(noteId)
                .then((note)=>{
                    this.bin.unshift(note)    
                })
            notesService.remove(noteId)
                .then(() => {
                    notesService.query()
                    .then(notes => {
                const regex = new RegExp(this.filterBy,'i')
                let fNotes = notes.filter(note => regex.test(note.info.title))
       
                this.allNotes = fNotes
                this.notesPinned = fNotes.filter(note => note.isPinned)
                this.notesOther = fNotes.filter(note => !note.isPinned)
                const msg = {
                    txt: `Note ${noteId} deleted...`,
                    type: 'success',
                }
                eventBus.emit('show-msg', msg)
                
                })})
        },
        pinNote(noteId){
            let noteToPin 
            notesService.get(noteId)
            .then(note => {
                noteToPin = note
                console.log(noteToPin);
                noteToPin.isPinned = !noteToPin.isPinned
                if (noteToPin.isPinned){
                    console.log(this.notesPinned);
                    this.notesPinned.unshift(noteToPin)
                    const idx2 = this.notesOther.findIndex(note => note.id === noteId)
                    this.notesOther.splice(idx2, 1)
                }else{
                    this.notesOther.unshift(noteToPin)
                    const idx1 = this.notesPinned.findIndex(note => note.id === noteId)
                    this.notesPinned.splice(idx1, 1)
                }
                notesService.save(noteToPin)
                notesService.query()
                    .then(notes => {this.allNotes = notes})
            })
        },
        filterNotes(filter){
            console.log(filter);
            this.filterBy = filter
            const regex = new RegExp(this.filterBy,'i')
            this.notesPinned = this.allNotes.filter(note =>note.isPinned && regex.test( note.info.title ||
                                                                          note.info.label ||
                                                                          note.info.txt || note.info.todos[0].txt||
                                                                          note.type))
            this.notesOther = this.allNotes.filter(note =>!note.isPinned && regex.test( note.info.title || note.info.label ||
                                                                                     note.info.txt || note.info.todos[0].txt ||
                                                                                     note.type))
        },
        changeNoteColor(inf){            
            notesService.get(inf.id)
            .then(note => {
                note.style = {backgroundColor: inf.color}
                if (note.isPinned){
                    this.notesPinned.map((curNote) => {
                        if (curNote.id === note.id) curNote.style.backgroundColor = inf.color
                    })
                }else{
                    this.notesOther.map((curNote) => {
                        if (curNote.id === note.id) curNote.style.backgroundColor = inf.color
                    })
                }
                notesService.save(note)
            })
            
        },
        duplicateNote(id){
            notesService.get(id)
            .then((note)=> {
                const dupNote = note
                dupNote.id = ''
                if (note.isPinned) this.notesPinned.unshift(note)
                else this.notesOther.unshift(note)
                notesService.save(dupNote)
                const msg = {
                    txt: `Note was duplicated...`,
                    type: 'success',
                }
                eventBus.emit('show-msg', msg)
            })
        },
        addToReminder(id){
            notesService.get(id)
            .then((note)=> {
                note.toRemined = true 
                notesService.save(note)
                this.reminder.unshift(note)
                const msg = {
                    txt: `Note ${note.id} added to Reminder`,
                    type: 'success',
                }
                eventBus.emit('show-msg', msg)
            })
        },
        userSectionChose(chose){
            return this.asideChose === chose
        },
        addToArchive(id){
            notesService.get(id)
            .then((note)=> {
                note.toArchive = true 
                notesService.save(note)
                this.archive.unshift(note)
                const msg = {
                    txt: `Note ${note.id} added to Archive`,
                    type: 'success',
                }
                eventBus.emit('show-msg', msg)
            })
        }
    },
    components:{
        noteFilter,
        noteAdd,
        noteList,
        noteArchive,
        noteBin,
        noteToRemind
    },
}