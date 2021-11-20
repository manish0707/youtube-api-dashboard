import type { NextPage } from "next";
import React, { useCallback, useEffect, useState } from "react";
import { ISearchParams, Item } from "../utils/api/@types";
import { searchYoutube } from "../utils/api";
import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { searchData } from "../utils/mockData/search";

const Home: NextPage = () => {
  const [results, setResults] = useState<Item[]>(searchData);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const fetchData = useCallback(async (options: ISearchParams) => {
    try {
      setIsLoading(true);
      const res = await searchYoutube(options);
      setResults(res);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData({
      type: "channel",
      q: "developer",
      maxResults: 10,
    });
  }, [fetchData]);

  const handleSearch = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await fetchData({ type: "channel", q: searchText, maxResults: 10 });
    setSearchText("");
  };

  return (
    <Box mt="20px">
      <Container maxW="container.xl">
        <VStack spacing={5}>
          <Heading>{`Search for Youtube Channels`}</Heading>
          <Text fontSize="1em" color='gray.500'>Find your Channels of any category. Ex: Developer, Sports, Comedy etc.  </Text>
          <form style={{ width: "100%" }} onSubmit={handleSearch}>
            <InputGroup size="lg">
              <InputRightElement>
                <IconButton
                  type="submit"
                  aria-label="search"
                  icon={<Search2Icon color="gray.300" />}
                />
              </InputRightElement>
              <Input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search for youtube channels"
              />
            </InputGroup>
          </form>

          {isLoading ? (
            <Spinner size="lg" />
          ) : (
            <Flex wrap="wrap" justifyContent="center">
              {results.map(
                ({
                  snippet: { channelId, channelTitle, description, thumbnails },
                }) => (
                  <VStack
                    key={channelId}
                    spacing={8}
                    flex={1}
                    boxShadow="md"
                    p={5}
                    m={5} 
                    minW="20rem"
                    maxW="20rem"
                    rounded="xl"
                  >
                    <Box>
                      <Image
                        rounded="full"
                        boxShadow="2xl"
                        boxSize="10em"
                        src={thumbnails?.medium.url}
                        alt={channelTitle}
                      />
                    </Box>
                    <Heading as="h2" size="md">
                      {channelTitle}
                    </Heading>
                    <Text>{description}</Text>
                  </VStack>
                )
              )}
            </Flex>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;
