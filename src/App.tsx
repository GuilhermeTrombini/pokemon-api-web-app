import React from "react";
import { Pokedash } from "./components/Pokedash";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Tabs defaultIndex={1}>
          <TabList>
            <Tab>Pokemon Search</Tab>
            <Tab>Pokedex</Tab>
          </TabList>
          <TabPanels>
            <TabPanel></TabPanel>
            <TabPanel>
              <Pokedash />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </header>
    </div>
  );
}

export default App;
