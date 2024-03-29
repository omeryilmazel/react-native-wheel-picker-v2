/**
 * @prettier
 * @flow
 * */

 import moment from 'moment'
 import 'moment/locale/cs';
 import 'moment/locale/de';
 import 'moment/locale/es';
 import 'moment/locale/fr';
 import 'moment/locale/it';
 import 'moment/locale/ja';
 import 'moment/locale/nl';
 import 'moment/locale/nb';
 import 'moment/locale/pl';
 import 'moment/locale/pt';
 import 'moment/locale/sv';

 export const DEFAULT_DATE_PICKER_FORMAT = 'ddd MMM D'
 
 const AM = 'AM'
 const PM = 'PM'
 const YEAR = 365
 const TODAY = 'Today'
 const ONE_DAY_IN_SECONDS = 86400;
 const ONE_SECOND = 1000;
 
 // it takes in format '12 AM' and return 24 format
 export function hourTo24Format(hour: string) {
     return parseInt(moment(hour, ['h A']).format('H'), 10)
 }
 
 // it takes in format 23 and return [11,'PM'] format
 export function hourTo12Format(hour: number) {
     const currDate = new Date()
     currDate.setHours(hour)
     return dateTo12Hour(currDate.toISOString())
 }
 
 export const dateTo12Hour = (dateString: string) => {
     const localDate = new Date(dateString)
     let hour = localDate.getHours()
     if (hour === 12) {
         return ['12', PM]
     }
     if (hour === 0) {
         return ['12', AM]
     }
     const afterMidday = hour % 12 === hour
     hour = afterMidday ? hour : hour % 12
     const amPm = afterMidday ? AM : PM
     return [hour.toString(), amPm]
 }
 
 export function increaseDateByDays(date: Date, numOfDays: ?number) {
     const nextDate = new Date(date.valueOf())
     nextDate.setDate(nextDate.getDate() + numOfDays)
     return nextDate
 }
 
 export function pickerDateArray(date: string, daysCount: number = YEAR, datePickerFormat: string = DEFAULT_DATE_PICKER_FORMAT, locale: string = "en") {
     const startDate = date ? new Date(date) : new Date()
     const arr = []
 
     for (let i = 0; i < daysCount; i++) {
         const ithDateFromStartDate = (Date.parse(startDate) / ONE_SECOND) + (i * ONE_DAY_IN_SECONDS)
         if (moment.unix(Date.parse(new Date()) / ONE_SECOND).format('MM/DD/YYYY') ===
             moment.unix(ithDateFromStartDate).format('MM/DD/YYYY')) {
             //arr.push(TODAY)
             arr.push(
                    formatDatePicker(ithDateFromStartDate, datePickerFormat, locale)
                )
         }
         else {
             arr.push(
                 formatDatePicker(ithDateFromStartDate, datePickerFormat, locale)
             )
         }
     }
     return arr
 }
 
 export function formatDatePicker(date: number, format: string, locale: string) {
     moment.locale(locale);
     return moment.unix(date).format(format);
 }
 
 export function formatDatePickertAsTimeFormat(date: number, format: string) {
     return moment(date).format(format);
 }
 
 export function getHoursArray(format24: boolean) {
     const hours = format24 ? { min: 0, max: 23 } : { min: 1, max: 12 }
     const arr = []
     for (let i = hours.min; i <= hours.max; i++) {
         arr.push(`00${i}`.slice(-2))
     }
     return arr
 }
 
 export function getFiveMinutesArray() {
     const arr = []
     arr.push('00')
     arr.push('05')
     for (let i = 10; i < 60; i += 5) {
         arr.push(`${i}`)
     }
     return arr
 }
 
 export function getMinutesArray() {
     const arr = []
     arr.push('00')
     arr.push('01')
     arr.push('02')
     arr.push('03')
     arr.push('04')
     arr.push('05')
     arr.push('06')
     arr.push('07')
     arr.push('08')
     arr.push('09')
     for (let i = 10; i < 60; i += 1) {
         arr.push(`${i}`)
     }
     return arr
 }
 
 export function getAmArray() {
     const arr = []
     arr.push(AM)
     arr.push(PM)
     return arr
 }
 
