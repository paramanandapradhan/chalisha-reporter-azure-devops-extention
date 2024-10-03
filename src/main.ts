import { mount } from 'svelte'
import './tailwind.css'
import './app.css'
import App from './App.svelte'
import * as SDK from "azure-devops-extension-sdk";


SDK.init();
console.log("SDK init done!");

const app = mount(App, { target: document.getElementById("app")! })
export default app
