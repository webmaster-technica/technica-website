import { getRoleEnumFromValue } from "../enums"

export class Praesidium {
  constructor(name = '', surname = '', role = null, course = '', drink = '', text = '', linkedin = '', picture = '@/assets/anoniem.png', picture_alt = '@/assets/anoniem.png') {
    this.name = name
    this.surname = surname
    this.role = getRoleEnumFromValue(role)
    this.course = course
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
      role: this.role.value,
      course: this.course,
      drink: this.drink,
      text: this.text,
      linkedin: this.linkedin,
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