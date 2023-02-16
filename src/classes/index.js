import { getRoleEnumFromValue, getEventEnumFromValue } from "../enums"

export class BaseObject {
  constructor(name = '', link = '', text = '', picture = 'https://firebasestorage.googleapis.com/v0/b/technica-website-defc6.appspot.com/o/praesidium%2Fanoniem.png?alt=media&token=5862e3df-b5ed-4114-a20e-8c56ce8e2871') {
    this.name = name
    this.link = link
    this.text = text
    this.picture = picture
  }
}


export class Praesidium extends BaseObject {
  constructor(name = '', surname = '', role = null, course = '', drink = '', text = '', linkedin = '', 
              picture = 'https://firebasestorage.googleapis.com/v0/b/technica-website-defc6.appspot.com/o/praesidium%2Fanoniem.png?alt=media&token=5862e3df-b5ed-4114-a20e-8c56ce8e2871', 
              picture_alt = 'https://firebasestorage.googleapis.com/v0/b/technica-website-defc6.appspot.com/o/praesidium%2Fanoniem.png?alt=media&token=5862e3df-b5ed-4114-a20e-8c56ce8e2871') {
    super(name, linkedin, text, picture)
    this.surname = surname
    this.role = getRoleEnumFromValue(role)
    this.course = course
    this.drink = drink
    this.picture_alt = picture_alt
  }

  get json(){
    return {
      name: this.name,
      surname: this.surname,
      role: this.role.value,
      course: this.course,
      drink: this.drink,
      text: this.text,
      linkedin: this.link,
      picture: this.picture,
      picture_alt: this.picture_alt
    }
  }
}

export class FirePraesidium extends Praesidium {
  constructor(id = '', {name, surname, role, course, drink, text, linkedin, picture, picture_alt} = null) {
    super(name, surname, role, course, drink, text, linkedin, picture, picture_alt)
    this.id = id
  }
}


export class TechnicaEvent {
  constructor(name = '', fbLink = '', type = null, formsLink = '', date = '', time = '', 
              location = '', price = 0.0, text = '', picture = '') {
    this.name = name
    this.fbLink = fbLink
    this.type = getEventEnumFromValue(type)
    this.formsLink = formsLink
    this.date = date
    this.time = time
    this.location = location
    this.price = price
    this.text = text
    this.picture = picture
  }

  get json(){
    return {
      name: this.name,
      fbLink: this.fbLink,
      type: this.type.value,
      formsLink: this.formsLink,
      date: this.date,
      time: this.time,
      location: this.location,
      price: this.price,
      text: this.text,
      picture: this.picture
    }
  }
}

export class FireTechnicaEvent extends TechnicaEvent {
  constructor(id = '', {name, fbLink, type, formsLink, date, time, location, price, text, picture} = null) {
    super(name, fbLink, type, formsLink, date, time, location, price, text, picture)
    this.id = id
  }
  
}

export class FullCalenderEvent {
  // https://fullcalendar.io/docs/event-object
  constructor(id = '', start = null, end = null, title = '', color = '#3788d8', textColor = '#fff') {
    this.id = id,                 // String
    this.start = start,           // String
    this.end = end,               // String
    this.title = title,           // String
    this.backgroundColor = color, // String
    this.borderColor = color,     // String
    this.textColor = textColor    // String
  }

  get json(){
    return {
      id: this.id,
      groupId: this.groupId,
      start: this.start,
      end: this.end,
      startStr: this.startStr,
      endStr: this.endStr,
      title: this.title,
      classNames: this.classNames,
      backgroundColor: this.backgroundColor,
      borderColor: this.borderColor,
      textColor: 'D3D3D3',
      eventClassNames: [ 'bold' ]
    }
  }
}