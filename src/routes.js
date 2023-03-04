import React from 'react';
import $ from 'jquery';


window.jQuery = $;
window.$ = $;
global.jQuery = $;

const ExaminationSchedule = React.lazy(()=> import('./pages/Schedule/ExaminationSchedule'))
const GenerateSchedule = React.lazy(()=> import('./pages/Schedule/GenerateSchedule'))
const SchedulePage = React.lazy(()=> import('./pages/SchedulePage'))

const routes = [
    { path: '/', exact: true, name: 'HomePage', component: ExaminationSchedule },
    { path: '/exam-schedule', exact: true, name: 'Examination Schedule', component: ExaminationSchedule },
    { path: '/schedule', exact: true, name: 'Schedule', component: SchedulePage },
    { path: '/generate-schedule', exact: true, name: 'Examination Schedule', component: GenerateSchedule },
];

export default routes;