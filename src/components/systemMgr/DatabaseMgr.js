// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics"
import {getDatabase, ref, set, onValue, update} from 'firebase/database'
import Papa from 'papaparse'
import User from "../entities/User"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export default class DatabaseMgr {
  constructor () {
    // this.activeUser = null
    this.properties = []
    this.initFirebase()
    this.fetchPropertyData()
  }

  initActiveUser(name, email, onFetchEnd) {
    const newUser = new User(name, email, true)
    const db = getDatabase()
    onValue(ref(db, `account/${newUser.id}`), snapshot => {
      const {recentSearches, bookmarks, filterOptions} = snapshot.val()
      newUser.recentSearches = recentSearches || []
      newUser.bookmarks = bookmarks || []
      newUser.filterOptions = filterOptions || []

      onFetchEnd(newUser)
    })
  }

  initFirebase () {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyAvXrCz1aaHL0MH8a6qQFW9zfwS8FP_mks",
      authDomain: "tryhard-web-app.firebaseapp.com",
      projectId: "tryhard-web-app",
      databaseURL: "https://tryhard-web-app-default-rtdb.asia-southeast1.firebasedatabase.app/",
      storageBucket: "tryhard-web-app.appspot.com",
      messagingSenderId: "750566440817",
      appId: "1:750566440817:web:731d0e05cc3376a18700d0",
      measurementId: "G-S92ZF52QRN"
    }

    // Initialize Firebase
    // const app = 
    initializeApp(firebaseConfig)
    // const analytics = getAnalytics(app)

    // test fetch data
    // this.fetchUserData(userData => {
    //   console.log('userData', userData)
    // })

    // test update data
    // this.updateUserData('recent', 'house')
  }

  fetchAllUserData(userId, onFetchEnd) {
    const db = getDatabase()
    onValue(ref(db, `account/${userId}`), snapshot => {
      onFetchEnd(snapshot.val())
    })
  }

  updateUserData(user, key, value) {
    if (!user) {
      console.log("no active user")
      return
    }
    const updates = {}
    const db = getDatabase()
    updates[`account/${user.id}/${key}`] = value
    
    update(ref(db), updates)
  }

  fetchFilterData (onFetchEnd) {
    const db = getDatabase()
    onValue(ref(db, `filterOptions`), snapshot => {
      onFetchEnd(snapshot.val())
    })
  }


  fetchPropertyData () {
    // fetch all property data at once
    fetch('data/data-all.csv')
      .then(res => res.text())
      .then(raw => Papa.parse(raw, {header: true}))
      .then(parsedRaw => {
        this.properties = parsedRaw.data
          .filter(d => d['valid postal'] > 0)
          .map(d => {
          d['description'] = 'Lorem Ipsum asd asd asd asd.'
          d['distToMrt'] = 1
          d['distToSchool'] = 2
          return d
        })
        
        console.log(this.properties)
      })
  }

  getProperties () {
    return this.properties
  }

}