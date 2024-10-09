// import path from "path";
import dotenv from "dotenv";

dotenv.config();
// dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });

interface ENV {
   NODE_ENV: string | undefined;
   PORT: number | undefined;
   MONGO_URI: string | undefined;
   JWT_ACCESS_SECRET: string | undefined;
   JWT_REFRESH_SECRET: string | undefined;
   OPENAI_API_KEY: string | undefined;
}

interface Config {
   NODE_ENV: string;
   PORT: number;
   MONGO_URI: string;
   JWT_ACCESS_SECRET: string;
   JWT_REFRESH_SECRET: string;
   OPENAI_API_KEY: string;
}

const getConfig = (): ENV => {
   return {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
      MONGO_URI: process.env.MONGO_URI,
      JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
      JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
   };
};

const getSanitzedConfig = (config: ENV): Config => {
   // console.log(config);
   for (const [key, value] of Object.entries(config)) {
      if (value === undefined) {
         throw new Error(`Missing key ${key} in config.env`);
      }
   }
   return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
