"use server";
import { promises as fs } from "fs";
import path from "path";
import { IState } from "../type";

export const getStates = async () => {
  try {
    // Get the current working directory (project root)
    const currentDirectory = process.cwd();
    // Construct the full path to your JSON file
    const filePath = path.join(
      currentDirectory,
      "src",
      "lib",
      "data",
      "states.json"
    );

    // Read the file content
    const fileContent = await fs.readFile(filePath, "utf8");

    // Parse the JSON content
    const data = JSON.parse(fileContent) as IState[];

    return data;
  } catch (error) {
    console.error("Error reading local JSON file:", error);
    throw new Error("Error getting states");
  }
};
