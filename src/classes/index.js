import { getRoleEnumFromValue, getEventEnumFromValue } from "../enums"

export class Praesidium {
  constructor(name = '', surname = '', nickname= '', role = -1, secondRole = -1, course = '', division = '', school = '', drink = '', text = '', linkedin = '', picture = 'https://firebasestorage.googleapis.com/v0/b/technica-website-defc6.appspot.com/o/praesidium%2Fanoniem.png?alt=media&token=5862e3df-b5ed-4114-a20e-8c56ce8e2871', 
  picture_alt = 'https://firebasestorage.googleapis.com/v0/b/technica-website-defc6.appspot.com/o/praesidium%2Fanoniem.png?alt=media&token=5862e3df-b5ed-4114-a20e-8c56ce8e2871') {

    this.name = name
    this.surname = surname
    this.nickname = nickname

    this.role = getRoleEnumFromValue(role)
    this.secondRole = getRoleEnumFromValue(secondRole)

    this.course = course
    this.division = division
    this.school = school

    this.drink = drink
    this.text = text
    this.linkedin = linkedin

    this.picture = picture
    this.picture_alt = picture_alt
  }

  get json(){
    return {
      name: this.name,
      surname: this.surname,
      nickname: this.nickname,

      role: this.role.value,
      secondRole: this.secondRole.value,

      course: this.course,
      division: this.division,
      school: this.school,

      drink: this.drink,
      text: this.text,
      linkedin: this.linkedin,

      picture: this.picture,
      picture_alt: this.picture_alt
    }
  }
}
export class FirePraesidium extends Praesidium {
  constructor(id = '', {name, surname, nickname, role, secondRole, course, division, school, drink, text, linkedin, picture, picture_alt} = null) {
    super(name, surname, nickname, role, secondRole, course, division, school, drink, text, linkedin, picture, picture_alt)
    this.id = id
  }
}

export class Member {
  constructor(name = '', surname = '', roles = [], approved = false) {
    this.name = name
    this.surname = surname
    roles.forEach(role => { role.role = getRoleEnumFromValue(role.role) })
    this.roles = roles
    this.approved = approved
  }

  get json(){
    return {
      name: this.name,
      surname: this.surname,
      roles: this.roles,
      approved: this.approved
    }
  }
}
export class FireMember extends Member {
  constructor(id = '', {name, surname, roles, approved} = null) {
    super(name, surname, roles, approved)
    this.id = id
  }
}

export class CondensedMember extends Member {
  constructor(id = '', name, surname, roles, approved) {
    super(name, surname, roles, approved)
    this.id = id
  }
}
export class MemberRole extends Member {
  constructor(role, start, end) {
    super(name, surname, roles, approved)
    this.id = id
  }
}


export class Partner {
  constructor(name = '', website = '', index = 0, logo = 'https://firebasestorage.googleapis.com/v0/b/technica-website-defc6.appspot.com/o/praesidium%2Fanoniem.png?alt=media&token=5862e3df-b5ed-4114-a20e-8c56ce8e2871') {

    this.name = name
    this.website = website
    this.index = index
    this.logo = logo
  }

  get json(){
    return {
      name: this.name,
      website: this.website,
      index: this.index,
      logo: this.logo
    }
  }
}
export class FirePartner extends Partner {
  constructor(id = '', {name, website, index, logo} = null) {
    super(name, website, index, logo)
    this.id = id
  }
}

export class Job {
  constructor(name = '', course = '', location = '', partner = '', pdf = '') {

    this.name = name
    this.course = course
    this.location = location
    this.partner = partner
    this.pdf = pdf
  }

  get json(){
    return {
      name: this.name,
      course: this.course,
      location: this.location,
      partner: this.partner,
      pdf: this.pdf
    }
  }
}
export class FireJob extends Job {
  constructor(id = '', {name, course, location, partner, pdf} = null) {
    super(name, course, location, partner, pdf)
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