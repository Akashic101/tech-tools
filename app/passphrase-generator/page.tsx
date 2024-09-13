"use client";

import {
  Button,
  Center,
  NumberInput,
  Stack,
  CopyButton,
  Grid,
  Flex,
  Textarea,
  TextInput,
  Alert,
} from "@mantine/core";
import { IconKey, IconQuestionMark } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { ToggleButton } from "../components/ToggleButton/ToggleButton";

export default function PasswordGenerator() {
  const [amountOfWords, setAmountOfWords] = useState<number | string>(8);
  const [divider, setDivider] = useState("-");
  const [capitalizeWords, setCapitalizeWords] = useState(true);
  const [generatedPassphrase, setGeneratedPassphrase] = useState("");
  const [fileContent, setFileContent] = useState<string>("");

  function getRandomNumber(max: number) {
    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);
    return randomBuffer[0] % (max + 1);
  }

  function generatePassphrase(): void {
    const maxNumber = 7775;
    const numberOfWords =
      typeof amountOfWords === "number"
        ? amountOfWords
        : parseInt(amountOfWords);

    const randomNumbers = Array.from({ length: numberOfWords }, () =>
      getRandomNumber(maxNumber)
    );

    let passphraseWords = [];

    for (let index = 0; index < randomNumbers.length; index++) {
      let word = searchLineInFile(randomNumbers[index]);
      if (capitalizeWords) {
        passphraseWords.push(word!.charAt(0).toUpperCase() + word!.slice(1));
      } else {
        passphraseWords.push(word);
      }
    }

    setGeneratedPassphrase(passphraseWords.toString().replaceAll(",", divider));
  }

  useEffect(() => {
    fetch("/data/eff_large_wordlist.txt")
      .then((response) => response.text())
      .then((text) => {
        setFileContent(text);
        console.log("File content loaded.");
      })
      .catch((error) => {
        console.error("Error loading the file:", error);
      });
  }, []);

  function searchLineInFile(lineNumber: number): string | undefined {
    if (fileContent) {
      const lines = fileContent.split("\n");
      const targetLine = lines[lineNumber - 1];
      if (targetLine) {
        return targetLine;
      } else {
        console.error(`Line ${lineNumber} not found in the file.`);
      }
    } else {
      console.error("File content is not loaded yet.");
    }
  }

  return (
    <Center>
      <Stack w={"70%"} align="stretch" justify="center" gap="md">
        <Grid grow>
          <Grid.Col span={2}>
            <ToggleButton
              label="Capitalize words"
              text="Should the first letter be capitalized"
              checked={capitalizeWords}
              onClick={() => setCapitalizeWords(!capitalizeWords)}
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <NumberInput
              label="Amount of words"
              value={amountOfWords}
              onChange={setAmountOfWords}
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <TextInput
              label="Divider"
              value={divider}
              onChange={(event) => setDivider(event.currentTarget.value)}
            />
          </Grid.Col>
        </Grid>
        <Grid grow>
          <Grid.Col span={8}>
            <Flex
              mih={50}
              gap="xl"
              justify="center"
              align="center"
              direction="row"
              wrap="wrap"
            >
              <Button
                w={200}
                leftSection={<IconKey size={14} />}
                variant="default"
                onClick={() => generatePassphrase()}
              >
                Generate
              </Button>
              <CopyButton
                data-disabled={!generatedPassphrase}
                value={generatedPassphrase || ""}
              >
                {({ copied, copy }) => (
                  <Button
                    w={200}
                    color={copied ? "teal" : "blue"}
                    onClick={copy}
                    disabled={!generatedPassphrase}
                  >
                    {copied ? "Copied passphrase" : "Copy passphrase"}
                  </Button>
                )}
              </CopyButton>
            </Flex>
          </Grid.Col>

          <Grid.Col span={6}>
            <Textarea
              readOnly
              label="Generated passphrase"
              value={generatedPassphrase}
            />
          </Grid.Col>
        </Grid>
        <Alert
          variant="light"
          color="blue"
          title="How does this work?"
          icon={<IconQuestionMark />}
        >
          This application generates a secure passphrase using a method based on
          randomly selecting words from a predefined wordlist. Here’s a
          step-by-step explanation of the process:
          <ul>
            <li>
              <strong>Word List:</strong> The passphrase is constructed from a
              word list provided by the{" "}
              <a href="https://www.eff.org/">
                Electronic Frontier Foundation (EFF)
              </a>
              . This word list is designed specifically for creating strong
              passphrases and is known for its security and reliability. The
              list contains common English words, each on a new line, and is
              loaded from the file located at{" "}
              <code>/data/eff_large_wordlist.txt</code>.
            </li>
            <li>
              <strong>Random Number Generation:</strong> To select words from
              the list, the application uses a Cryptographically Secure
              Pseudorandom Number Generator (CSPRNG). This ensures that the
              random numbers generated are highly unpredictable and secure. The
              function <code>getRandomNumber(max)</code> generates a random
              integer between 0 and <code>max</code>, which corresponds to the
              index of a word in the list.
            </li>
            <li>
              <strong>Word Selection:</strong> The number of words for the
              passphrase is determined by user input. The application selects
              the required number of random indices, retrieves the corresponding
              words from the list, and optionally capitalizes the first letter
              of each word based on user preference.
            </li>
            <li>
              <strong>Passphrase Construction:</strong> The selected words are
              joined together into a single passphrase using a specified divider
              (e.g., a dash <code>-</code>). If the user has chosen to
              capitalize words, the first letter of each word is capitalized
              before joining.
            </li>
          </ul>
          <p>
            <strong>About the EFF Word List:</strong> The word list used in this
            application is sourced from the Electronic Frontier Foundation
            (EFF). The EFF is a reputable organization known for its work in
            digital privacy and security. Their word list is carefully curated
            to balance ease of use and security, making it an excellent choice
            for generating strong, memorable passphrases.
          </p>
          <p>
            This method ensures that each passphrase is both random and secure,
            leveraging a strong random number generator and a reliable word list
            to create unique and unpredictable passphrases.
          </p>
        </Alert>
      </Stack>
    </Center>
  );
}
