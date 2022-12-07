<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script>
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
// init fullcalander: https://fullcalendar.io/docs/vue
// documentation: https://fullcalendar.io/docs/intro
// event click: https://fullcalendar.io/docs/eventClick
// event object: https://fullcalendar.io/docs/event-object

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        events: [
          { title: 'event 1', date: '2023-01-10' },
          { title: 'event 2', date: '2022-12-10' }
        ],
        eventClick: this.handleEventClick
      }
    }
  },
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