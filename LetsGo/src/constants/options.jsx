// export const SelectTravelesList=[
//     {
//     id:1,
//     title: 'Just Me',
//     desc: 'A sole traveles in exploration',
//     icon:'',
//     people: '1'
//     },
//     {
//     id:2,
//     title: 'A Couple',
//     desc: 'Two traveles in tandem',
//     icon:'',
//     people: '2 People'
//     },
//     {
//     id:3,
//     title: 'Family',
//     desc: 'A group of fun loving adv',
//     icon:'',
//     people: '3 to 5 People'},
//     {
//         id:4,
//         title: 'Friends',
//         desc: 'A bunch of tril seekes',
//         icon:'',
//         people: '5 to 10 People'
//     }]

//     export const SelectBudgetOptions=[
//         {
//         id:1,
//         title: 'Cheap',
//         desc: 'Stay conscious of costs',
//         icon:'',
//         },
//         {
//         id:2,
//         title: 'Moderate',
//         desc: 'Keep cost on the average side',
//         icon:'',
//         },
//         {
//         id:3,
//         title: 'Luxury',
//         desc: 'Dont worry about cost',
//         icon:'',
//         },
//     ]

//     export const AI_PROMPT= 'Generate travel plan for location:{location}'

import { FaUser, FaUserFriends, FaUsers, FaPeopleCarry, FaMoneyBillWave, FaHandHoldingUsd, FaGem } from 'react-icons/fa';

export const SelectTravelesList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A sole traveler in exploration',
    icon: '✈️',
    people: '1 person',
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two travelers in tandem',
    icon: '🥂',
    people: '2 People',
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun-loving adventurers',
    icon: '🏡',
    people: '3 to 5 People',
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'A bunch of thrill seekers',
    icon: '🚢',
    people: '5 to 10 People',
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of costs',
    icon: '💵',
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep costs on the average side',
    icon: '💰',
  },
  {
    id: 3,
    title: 'Luxury',
    desc: "Don't worry about cost",
    icon: '💸',
  },
];

export const AI_PROMPT ='Generate Travel Plan for Location: {location}, for {totalDays} days for {traveler} people with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates,ratings, ticket Pricing, Time t travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.';