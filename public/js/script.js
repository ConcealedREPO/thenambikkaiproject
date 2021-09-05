import { openNavigation } from "./util/navigation.js";
import { populateEventGrid } from "./util/showmore.js"
import { payment } from "./util/payment.js"
import {populateMembers} from "../js/aboutUs.js"
openNavigation()
populateEventGrid()
payment()
populateMembers()