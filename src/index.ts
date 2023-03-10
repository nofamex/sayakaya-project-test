import { GenericGreeter } from "@/modules/helper";
import * as dotenv from "dotenv";

dotenv.config();

GenericGreeter<string>("hellow");
GenericGreeter<number>(22);
GenericGreeter<boolean>(true);
