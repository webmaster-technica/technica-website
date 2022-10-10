// https://stackoverflow.com/a/2383215
export const RoleEnum = Object.freeze({
  PRAESES:          {value: 0,  name: 'Praeses',          mail: 'praeses@technica-antwerpen.be'},
  VICE_PRAESES:     {value: 1,  name: 'Vice-Praeses',     mail: 'vicepraeses@technica-antwerpen.be'},
  QUAESTOR:         {value: 2,  name: 'Quaestor',         mail: 'financieel@technica-antwerpen.be'},
  CANTOR:           {value: 3,  name: 'Cantor',           mail: 'cantor@technica-antwerpen.be'},
  AB_ACTIS:         {value: 4,  name: 'Ab-Actis',         mail: 'abactis@technica-antwerpen.be'},
  SCHACHTENMEESTER: {value: 5,  name: 'Schachtenmeester', mail: 'schachtenmeester@technica-antwerpen.be'},
  SCHACHTENTEMMER:  {value: 6,  name: 'Schachtentemmer',  mail: 'schachtenmeester@technica-antwerpen.be'},
  ZEDENMEESTER:     {value: 7,  name: 'Zedenmeester',     mail: 'zeden@technica-antwerpen.be'},
  FEEST:            {value: 8,  name: 'Feest',            mail: 'feest@technica-antwerpen.be'},
  SOC:              {value: 9,  name: 'S.O.C.',           mail: 'soc@technica-antwerpen.be'},
  PR:               {value: 10, name: 'P.R.',             mail: 'pr@technica-antwerpen.be'},
  REDACTOR:         {value: 11, name: 'Redactor',         mail: 'redactor@technica-antwerpen.be'},
  MEDIA:            {value: 12, name: 'Media',            mail: 'media@technica-antwerpen.be'},
  WEBMASTER:        {value: 13, name: 'Webmaster',        mail: 'webmaster@technica-antwerpen.be'},
  RESIDENT_DJ:      {value: 14, name: 'Resident DJ',      mail: 'residentdj@technica-antwerpen.be'},
  PETER:            {value: 15, name: 'Peter',            mail: null},
  METER:            {value: 16, name: 'Meter',            mail: null},
  ERE_LID:          {value: 17, name: 'Ere-Lid',          mail: null},
  ERE_PRAESES:      {value: 18, name: 'Ere-Praeses',      mail: null}
})

export function getRoleEnumFromValue(value = 0){
  for (var role in RoleEnum){
    if (RoleEnum[role].value == value) {
      // console.log(RoleEnum[role])
      return RoleEnum[role]
    }
  }
}

export function getRoleEnumName(name = 'Praeses'){
  for (var role in RoleEnum){
    if (RoleEnum[role].name == name) {
      // console.log(RoleEnum[role])
      return RoleEnum[role]
    }
  }
}