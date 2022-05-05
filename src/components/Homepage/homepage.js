import React from "react"
import { useLinkTo } from '@react-navigation/native';

// ...

function Home() {
  const linkTo = useLinkTo();

  return (
    <Button onPress={() => linkTo('/homepage/homepage.js')}>
      Home Page
    </Button>
  );
}

// id = '#root'
// class = '.home-page', '.form', '.about', '.write', '.research', '.contact'

<div id='root'>;
    <section id='hp-banner'> Eat the world, one bite at a time. </section>;
    <div id='fun'> Surveys can be even more FUN with SurveyBite </div>;
        <div id='about'> About SurveyBite </div>
        <div id='write'> How to Brainstorm Survey Ideas </div>
        <div id='research'> The Science of Surveys </div>
        <div id='contact'> Wanna Chat? Contact us! </div>

<footer> Copyright 2022, All Rights Reserved, SurveyBite 
    <ul>
        <li> Facebook </li>
        <li> Twitter </li>
    </ul>
</footer>
</div>
