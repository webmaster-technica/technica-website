<template>
  <FullCalendar :options="calendarOptions"/>
</template>

<script>
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { FullCalenderEvent } from '@/classes'
// init fullcalander: https://fullcalendar.io/docs/vue
// documentation: https://fullcalendar.io/docs/intro
// event click: https://fullcalendar.io/docs/eventClick
// event object: https://fullcalendar.io/docs/event-object

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  props: ['calenderEvents'],
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        events: [ /* { title: 'event 1', start: '2023-02-08', end: '2023-02-09' }, */ ],
        eventClick: this.handleEventClick
      }
    }
  },
  created() {
    this.$props.calenderEvents.forEach(event => {
      let calenderEvent = new FullCalenderEvent(event.id, event.date, event.date, event.name, event.type ? event.type.color : '#3788d8')
      this.calendarOptions.events.push(calenderEvent.json)
    });
  },
  emits: ["eventClick"],
  methods: {
    handleDateClick: function(arg) {
      // alert('date click! ' + arg.dateStr)
    },
    handleEventClick: function(arg) {
      arg.jsEvent.preventDefault(); // don't let the browser navigate
      this.$emit('eventClick', arg.event);
    }
  }
}
</script>

<style>
  .fc-event-title { font-weight: bold; }
</style>