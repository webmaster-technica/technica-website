// https://stackoverflow.com/a/2383215
export const QueryEnum = {
  LESS:                   { value: '<' },
  LESS_OR_EQUAL:          { value: '<=' },
  EQUAL:                  { value: '==' },
  GREATER:                { value: '>' },
  GREATER_OR_EQUAL:       { value: '>=' },
  NOT_EQUAL:              { value: '!=' },
  DB_ARRAY_CONTAINS:      { value: 'array-contains' },
  DB_ARRAY_CONTAINS_ANY:  { value: 'array-contains-any' },
  DB_VALUE_IN:            { value: 'in' },
  DB_VALUE_NOT_IN:        { value: 'not-in' }
}

export const RoleEnum = Object.freeze({
  NULL:                 {value: -1, name: 'null',                 mail: null},
  PRAESES:              {value: 0,  name: 'Praeses',              mail: 'praeses@technica-antwerpen.be'},
  VICE_PRAESES:         {value: 1,  name: 'Vice-Praeses',         mail: 'vicepraeses@technica-antwerpen.be'},
  QUAESTOR:             {value: 2,  name: 'Quaestor',             mail: 'financieel@technica-antwerpen.be'},
  CANTOR:               {value: 3,  name: 'Cantor',               mail: 'cantor@technica-antwerpen.be'},
  AB_ACTIS:             {value: 4,  name: 'Ab-Actis',             mail: 'abactis@technica-antwerpen.be'},
  SCHACHTENMEESTER:     {value: 5,  name: 'Schachtenmeester',     mail: 'schachtenmeester@technica-antwerpen.be'},
  SCHACHTENTEMMER:      {value: 6,  name: 'Schachtentemmer',      mail: 'schachtenmeester@technica-antwerpen.be'},
  ZEDENMEESTER:         {value: 7,  name: 'Zedenmeester',         mail: 'zeden@technica-antwerpen.be'},
  FEEST:                {value: 8,  name: 'Feest',                mail: 'feest@technica-antwerpen.be'},
  SOC:                  {value: 9,  name: 'S.O.C.',               mail: 'soc@technica-antwerpen.be'},
  PR:                   {value: 10, name: 'P.R.',                 mail: 'pr@technica-antwerpen.be'},
  REDACTOR:             {value: 11, name: 'Redactor',             mail: 'redactor@technica-antwerpen.be'},
  MEDIA:                {value: 12, name: 'Media',                mail: 'media@technica-antwerpen.be'},
  WEBMASTER:            {value: 13, name: 'Webmaster',            mail: 'webmaster@technica-antwerpen.be'},
  RESIDENT_DJ:          {value: 14, name: 'Resident DJ',          mail: 'residentdj@technica-antwerpen.be'},
  PETER:                {value: 15, name: 'Peter',                mail: null},
  METER:                {value: 16, name: 'Meter',                mail: null},
  ERE_LID:              {value: 17, name: 'Ere-Lid',              mail: null},
  ERE_PRAESES:          {value: 18, name: 'Ere-Praeses',          mail: null},
  ERE_CANTOR:           {value: 19, name: 'Ere-Cantor',           mail: null},
  MASCOTTE:             {value: 20, name: 'Mascotte',             mail: null},
  KROEGBAAS:            {value: 21, name: 'Kroegbaas',            mail: null},
  BIERKONING:           {value: 22, name: 'Bierkoning',           mail: null},
  SCHACHTENKONING:      {value: 23, name: 'Schachtenkoning',      mail: null},
  SCHACHTENKONIGING:    {value: 24, name: 'Schachtenkoniging',    mail: null},
  HONORIS_CAUSA:        {value: 25, name: 'Honoris Causa',        mail: null},
  SCHACHTENMEESTERES:   {value: 26, name: 'Schachtenmeesteres',   mail: null},
  INTERNE_COMMUNICATIE: {value: 27, name: 'Interne Communicatie', mail: null},
  SPORT_EN_CULTUUR:     {value: 28, name: 'Sport & Cultuur',      mail: null},
  SPORT:                {value: 29, name: 'Sport',                mail: null},
  CULTUUR:              {value: 30, name: 'Cultuur',              mail: null},
  MENTOR:               {value: 31, name: 'Mentor',               mail: null},
  FEESTLEIDER:          {value: 32, name: 'Feestleider',          mail: null},
  BIERMEESTER:          {value: 33, name: 'Biermeester',          mail: null},
  BORRELMEESTER:        {value: 34, name: 'Borrelmeester',        mail: null}
})

export function getRoleEnumFromValue(value = 0){
  if (value == null) return null
  for (var role in RoleEnum){
    if (RoleEnum[role].value == value) {
      // console.log(RoleEnum[role])
      return RoleEnum[role]
    }
  }
}

export function getRoleEnumFromName(name = 'Praeses'){
  for (var role in RoleEnum){
    if (RoleEnum[role].name == name) {
      // console.log(RoleEnum[role])
      return RoleEnum[role]
    }
  }
}

export const EventEnum = Object.freeze({
  CANTOR:           {value: 0,  name: 'Cantus',     color: '#a2242f' },
  SCHACHTENMEESTER: {value: 1,  name: 'Schachten',  color: '#ff8c00' },
  FEEST:            {value: 2,  name: 'Feest',      color: '#50C878' },
  SOC:              {value: 3,  name: 'S.O.C.',     color: '#3788d8' },
  PR:               {value: 4,  name: 'P.R.',       color: '#46295a' }
})

export function getEventEnumFromValue(value = 0){
  for (var Event in EventEnum){
    if (EventEnum[Event].value == value) {
      // console.log(EventEnum[Event])
      return EventEnum[Event]
    }
  }
}

export function getEventEnumName(name = 'Praeses'){
  for (var Event in RoleEnum){
    if (EventEnum[Event].name == name) {
      // console.log(EventEnum[Event])
      return EventEnum[Event]
    }
  }
}