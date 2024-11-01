import React from 'react';
import {  Image,Badge} from "@chakra-ui/react";

import { Box } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

export default function FrontMernList({ property }) {
  return (
    <div className="row">
      {property.map((item, index) => (
        <div key={index} className="col-lg-4 offset-lg-1">
          <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
            {/* YouTube Video Embed */}
            <Box>
              <iframe
                width="100%"
                height="300" // Adjust height as necessary
                src={`https://www.youtube.com/embed/${item.videoId}`}
                title={item.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </Box>

            <Box p="6">
              <Box display="flex" alignItems="baseline">
                <Badge borderRadius="full" px="2" colorScheme="teal">
                
                </Badge>
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  ml="2"
                >
                </Box>
              </Box>

              <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
                {item.title}
              </Box>

              <Box>
                {item.formattedPrice}
                <Box as="span" color="gray.600" fontSize="sm">
                  
                </Box>
              </Box>

              <Box display="flex" mt="2" alignItems="center">
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <StarIcon key={i} color={i < item.rating ? "teal.500" : "gray.300"} />
                  ))}
                <Box as="span" ml="2" color="gray.600" fontSize="sm">
                  {item.reviewCount} reviews
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
      ))}
    </div>
  );
}
