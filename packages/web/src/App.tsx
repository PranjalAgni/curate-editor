import React from "react";

export interface HelloWorldProps {
  userName: string;
  lang: string;
}

const App = ({ userName, lang }: HelloWorldProps) => (
  <h1>
    Hi {userName} from React! Welcome to {lang}!
  </h1>
);

export default App;
