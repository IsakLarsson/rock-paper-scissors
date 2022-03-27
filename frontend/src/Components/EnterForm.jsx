import React, { useState, useEffect } from "react";
import { Input } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";

export default function EnterForm({ clickHandler, placeholder, buttonText }) {
    const [inputValue, setinputValue] = useState("");
    return (
        <div>
            <Stack direction={["column", "row"]} shouldWrapChildren={true}>
                <Input
                    value={inputValue}
                    onInput={(e) => setinputValue(e.target.value)}
                    placeholder={placeholder}
                    width={60}
                />
                <Button
                    colorScheme={"green"}
                    onClick={() => clickHandler(inputValue)}
                >
                    {buttonText}
                </Button>
            </Stack>
        </div>
    );
}
