// Ref: https://developers.amadeus.com/self-service/apis-docs/guides/developer-guides/developer-tools/postman/

export const flightsData = {
    "meta": {
        "count": 36,
        "links": {
            "self": "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=DEL&destinationLocationCode=BOM&departureDate=2025-04-15&returnDate=2025-04-22&adults=1"
        }
    },
    "data": [
        {
            "type": "flight-offer",
            "id": "1",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "lastTicketingDate": "2025-04-08",
            "lastTicketingDateTime": "2025-04-08",
            "numberOfBookableSeats": 5,
            "itineraries": [
                {
                    "duration": "PT2H10M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "DEL",
                                "terminal": "3",
                                "at": "2025-04-15T06:30:00"
                            },
                            "arrival": {
                                "iataCode": "BOM",
                                "terminal": "2",
                                "at": "2025-04-15T08:40:00"
                            },
                            "carrierCode": "AI",
                            "number": "865",
                            "aircraft": {
                                "code": "320"
                            },
                            "operating": {
                                "carrierCode": "AI"
                            },
                            "duration": "PT2H10M",
                            "id": "1",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                },
                {
                    "duration": "PT2H25M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "BOM",
                                "terminal": "2",
                                "at": "2025-04-22T17:15:00"
                            },
                            "arrival": {
                                "iataCode": "DEL",
                                "terminal": "3",
                                "at": "2025-04-22T19:40:00"
                            },
                            "carrierCode": "AI",
                            "number": "866",
                            "aircraft": {
                                "code": "321"
                            },
                            "operating": {
                                "carrierCode": "AI"
                            },
                            "duration": "PT2H25M",
                            "id": "2",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "INR",
                "total": "12350.00",
                "base": "10800.00",
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": "12350.00"
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": true
            },
            "validatingAirlineCodes": [
                "AI"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "INR",
                        "total": "12350.00",
                        "base": "10800.00"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "1",
                            "cabin": "ECONOMY",
                            "fareBasis": "YSAVER",
                            "class": "Y",
                            "includedCheckedBags": {
                                "weight": 25,
                                "weightUnit": "KG"
                            }
                        },
                        {
                            "segmentId": "2",
                            "cabin": "ECONOMY",
                            "fareBasis": "YSAVER",
                            "class": "Y",
                            "includedCheckedBags": {
                                "weight": 25,
                                "weightUnit": "KG"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "type": "flight-offer",
            "id": "2",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "lastTicketingDate": "2025-04-08",
            "lastTicketingDateTime": "2025-04-08",
            "numberOfBookableSeats": 9,
            "itineraries": [
                {
                    "duration": "PT2H05M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "DEL",
                                "terminal": "1",
                                "at": "2025-04-15T10:15:00"
                            },
                            "arrival": {
                                "iataCode": "BOM",
                                "terminal": "1",
                                "at": "2025-04-15T12:20:00"
                            },
                            "carrierCode": "6E",
                            "number": "518",
                            "aircraft": {
                                "code": "320"
                            },
                            "operating": {
                                "carrierCode": "6E"
                            },
                            "duration": "PT2H05M",
                            "id": "3",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                },
                {
                    "duration": "PT2H15M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "BOM",
                                "terminal": "1",
                                "at": "2025-04-22T13:30:00"
                            },
                            "arrival": {
                                "iataCode": "DEL",
                                "terminal": "1",
                                "at": "2025-04-22T15:45:00"
                            },
                            "carrierCode": "6E",
                            "number": "519",
                            "aircraft": {
                                "code": "320"
                            },
                            "operating": {
                                "carrierCode": "6E"
                            },
                            "duration": "PT2H15M",
                            "id": "4",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "INR",
                "total": "9870.00",
                "base": "8400.00",
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": "9870.00"
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": false
            },
            "validatingAirlineCodes": [
                "6E"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "INR",
                        "total": "9870.00",
                        "base": "8400.00"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "3",
                            "cabin": "ECONOMY",
                            "fareBasis": "SAVER",
                            "class": "S",
                            "includedCheckedBags": {
                                "weight": 15,
                                "weightUnit": "KG"
                            }
                        },
                        {
                            "segmentId": "4",
                            "cabin": "ECONOMY",
                            "fareBasis": "SAVER",
                            "class": "S",
                            "includedCheckedBags": {
                                "weight": 15,
                                "weightUnit": "KG"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "type": "flight-offer",
            "id": "3",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "lastTicketingDate": "2025-04-08",
            "lastTicketingDateTime": "2025-04-08",
            "numberOfBookableSeats": 4,
            "itineraries": [
                {
                    "duration": "PT2H15M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "BOM",
                                "terminal": "2",
                                "at": "2025-04-15T07:45:00"
                            },
                            "arrival": {
                                "iataCode": "DEL",
                                "terminal": "3",
                                "at": "2025-04-15T10:00:00"
                            },
                            "carrierCode": "UK",
                            "number": "944",
                            "aircraft": {
                                "code": "320"
                            },
                            "operating": {
                                "carrierCode": "UK"
                            },
                            "duration": "PT2H15M",
                            "id": "5",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                },
                {
                    "duration": "PT2H10M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "DEL",
                                "terminal": "3",
                                "at": "2025-04-22T18:25:00"
                            },
                            "arrival": {
                                "iataCode": "BOM",
                                "terminal": "2",
                                "at": "2025-04-22T20:35:00"
                            },
                            "carrierCode": "UK",
                            "number": "981",
                            "aircraft": {
                                "code": "321"
                            },
                            "operating": {
                                "carrierCode": "UK"
                            },
                            "duration": "PT2H10M",
                            "id": "6",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "INR",
                "total": "14750.00",
                "base": "12800.00",
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": "14750.00"
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": true
            },
            "validatingAirlineCodes": [
                "UK"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "INR",
                        "total": "14750.00",
                        "base": "12800.00"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "5",
                            "cabin": "ECONOMY",
                            "fareBasis": "YFLEX",
                            "class": "Y",
                            "includedCheckedBags": {
                                "weight": 20,
                                "weightUnit": "KG"
                            }
                        },
                        {
                            "segmentId": "6",
                            "cabin": "ECONOMY",
                            "fareBasis": "YFLEX",
                            "class": "Y",
                            "includedCheckedBags": {
                                "weight": 20,
                                "weightUnit": "KG"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "type": "flight-offer",
            "id": "4",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "lastTicketingDate": "2025-04-08",
            "lastTicketingDateTime": "2025-04-08",
            "numberOfBookableSeats": 7,
            "itineraries": [
                {
                    "duration": "PT2H20M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "DEL",
                                "terminal": "3",
                                "at": "2025-04-15T14:10:00"
                            },
                            "arrival": {
                                "iataCode": "CCU",
                                "terminal": "2",
                                "at": "2025-04-15T16:30:00"
                            },
                            "carrierCode": "AI",
                            "number": "763",
                            "aircraft": {
                                "code": "321"
                            },
                            "operating": {
                                "carrierCode": "AI"
                            },
                            "duration": "PT2H20M",
                            "id": "7",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                },
                {
                    "duration": "PT2H30M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "CCU",
                                "terminal": "2",
                                "at": "2025-04-22T09:45:00"
                            },
                            "arrival": {
                                "iataCode": "DEL",
                                "terminal": "3",
                                "at": "2025-04-22T12:15:00"
                            },
                            "carrierCode": "AI",
                            "number": "764",
                            "aircraft": {
                                "code": "320"
                            },
                            "operating": {
                                "carrierCode": "AI"
                            },
                            "duration": "PT2H30M",
                            "id": "8",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "INR",
                "total": "11650.00",
                "base": "9900.00",
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": "11650.00"
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": true
            },
            "validatingAirlineCodes": [
                "AI"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "INR",
                        "total": "11650.00",
                        "base": "9900.00"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "7",
                            "cabin": "ECONOMY",
                            "fareBasis": "YSAVER",
                            "class": "Y",
                            "includedCheckedBags": {
                                "weight": 25,
                                "weightUnit": "KG"
                            }
                        },
                        {
                            "segmentId": "8",
                            "cabin": "ECONOMY",
                            "fareBasis": "YSAVER",
                            "class": "Y",
                            "includedCheckedBags": {
                                "weight": 25,
                                "weightUnit": "KG"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "type": "flight-offer",
            "id": "5",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "lastTicketingDate": "2025-04-08",
            "lastTicketingDateTime": "2025-04-08",
            "numberOfBookableSeats": 8,
            "itineraries": [
                {
                    "duration": "PT2H15M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "CCU",
                                "terminal": "2",
                                "at": "2025-04-15T15:40:00"
                            },
                            "arrival": {
                                "iataCode": "DEL",
                                "terminal": "1",
                                "at": "2025-04-15T17:55:00"
                            },
                            "carrierCode": "6E",
                            "number": "348",
                            "aircraft": {
                                "code": "320"
                            },
                            "operating": {
                                "carrierCode": "6E"
                            },
                            "duration": "PT2H15M",
                            "id": "9",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                },
                {
                    "duration": "PT2H25M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "DEL",
                                "terminal": "1",
                                "at": "2025-04-22T06:15:00"
                            },
                            "arrival": {
                                "iataCode": "CCU",
                                "terminal": "2",
                                "at": "2025-04-22T08:40:00"
                            },
                            "carrierCode": "6E",
                            "number": "347",
                            "aircraft": {
                                "code": "320"
                            },
                            "operating": {
                                "carrierCode": "6E"
                            },
                            "duration": "PT2H25M",
                            "id": "10",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "INR",
                "total": "9250.00",
                "base": "7800.00",
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": "9250.00"
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": false
            },
            "validatingAirlineCodes": [
                "6E"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "INR",
                        "total": "9250.00",
                        "base": "7800.00"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "9",
                            "cabin": "ECONOMY",
                            "fareBasis": "SAVER",
                            "class": "S",
                            "includedCheckedBags": {
                                "weight": 15,
                                "weightUnit": "KG"
                            }
                        },
                        {
                            "segmentId": "10",
                            "cabin": "ECONOMY",
                            "fareBasis": "SAVER",
                            "class": "S",
                            "includedCheckedBags": {
                                "weight": 15,
                                "weightUnit": "KG"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "type": "flight-offer",
            "id": "6",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "lastTicketingDate": "2025-04-08",
            "lastTicketingDateTime": "2025-04-08",
            "numberOfBookableSeats": 5,
            "itineraries": [
                {
                    "duration": "PT2H45M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "DEL",
                                "terminal": "3",
                                "at": "2025-04-15T08:45:00"
                            },
                            "arrival": {
                                "iataCode": "BLR",
                                "terminal": "1",
                                "at": "2025-04-15T11:30:00"
                            },
                            "carrierCode": "UK",
                            "number": "807",
                            "aircraft": {
                                "code": "321"
                            },
                            "operating": {
                                "carrierCode": "UK"
                            },
                            "duration": "PT2H45M",
                            "id": "11",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                },
                {
                    "duration": "PT2H50M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "BLR",
                                "terminal": "1",
                                "at": "2025-04-22T16:20:00"
                            },
                            "arrival": {
                                "iataCode": "DEL",
                                "terminal": "3",
                                "at": "2025-04-22T19:10:00"
                            },
                            "carrierCode": "UK",
                            "number": "808",
                            "aircraft": {
                                "code": "320"
                            },
                            "operating": {
                                "carrierCode": "UK"
                            },
                            "duration": "PT2H50M",
                            "id": "12",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "INR",
                "total": "15250.00",
                "base": "13300.00",
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": "15250.00"
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": true
            },
            "validatingAirlineCodes": [
                "UK"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "INR",
                        "total": "15250.00",
                        "base": "13300.00"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "11",
                            "cabin": "ECONOMY",
                            "fareBasis": "YFLEX",
                            "class": "Y",
                            "includedCheckedBags": {
                                "weight": 20,
                                "weightUnit": "KG"
                            }
                        },
                        {
                            "segmentId": "12",
                            "cabin": "ECONOMY",
                            "fareBasis": "YFLEX",
                            "class": "Y",
                            "includedCheckedBags": {
                                "weight": 20,
                                "weightUnit": "KG"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "type": "flight-offer",
            "id": "7",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "lastTicketingDate": "2025-04-08",
            "lastTicketingDateTime": "2025-04-08",
            "numberOfBookableSeats": 9,
            "itineraries": [
                {
                    "duration": "PT2H40M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "BLR",
                                "terminal": "1",
                                "at": "2025-04-15T05:55:00"
                            },
                            "arrival": {
                                "iataCode": "DEL",
                                "terminal": "1",
                                "at": "2025-04-15T08:35:00"
                            },
                            "carrierCode": "6E",
                            "number": "564",
                            "aircraft": {
                                "code": "320"
                            },
                            "operating": {
                                "carrierCode": "6E"
                            },
                            "duration": "PT2H40M",
                            "id": "13",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                },
                {
                    "duration": "PT2H55M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "DEL",
                                "terminal": "1",
                                "at": "2025-04-22T21:45:00"
                            },
                            "arrival": {
                                "iataCode": "BLR",
                                "terminal": "1",
                                "at": "2025-04-23T00:40:00"
                            },
                            "carrierCode": "6E",
                            "number": "565",
                            "aircraft": {
                                "code": "320"
                            },
                            "operating": {
                                "carrierCode": "6E"
                            },
                            "duration": "PT2H55M",
                            "id": "14",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "INR",
                "total": "10450.00",
                "base": "8950.00",
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": "10450.00"
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": false
            },
            "validatingAirlineCodes": [
                "6E"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "INR",
                        "total": "10450.00",
                        "base": "8950.00"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "13",
                            "cabin": "ECONOMY",
                            "fareBasis": "SAVER",
                            "class": "S",
                            "includedCheckedBags": {
                                "weight": 15,
                                "weightUnit": "KG"
                            }
                        },
                        {
                            "segmentId": "14",
                            "cabin": "ECONOMY",
                            "fareBasis": "SAVER",
                            "class": "S",
                            "includedCheckedBags": {
                                "weight": 15,
                                "weightUnit": "KG"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "type": "flight-offer",
            "id": "8",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "lastTicketingDate": "2025-04-08",
            "lastTicketingDateTime": "2025-04-08",
            "numberOfBookableSeats": 4,
            "itineraries": [
                {
                    "duration": "PT2H40M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "BOM",
                                "terminal": "2",
                                "at": "2025-04-15T12:30:00"
                            },
                            "arrival": {
                                "iataCode": "CCU",
                                "terminal": "2",
                                "at": "2025-04-15T15:10:00"
                            },
                            "carrierCode": "AI",
                            "number": "676",
                            "aircraft": {
                                "code": "321"
                            },
                            "operating": {
                                "carrierCode": "AI"
                            },
                            "duration": "PT2H40M",
                            "id": "15",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                },
                {
                    "duration": "PT2H50M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "CCU",
                                "terminal": "2",
                                "at": "2025-04-22T07:30:00"
                            },
                            "arrival": {
                                "iataCode": "BOM",
                                "terminal": "2",
                                "at": "2025-04-22T10:20:00"
                            },
                            "carrierCode": "AI",
                            "number": "677",
                            "aircraft": {
                                "code": "320"
                            },
                            "operating": {
                                "carrierCode": "AI"
                            },
                            "duration": "PT2H50M",
                            "id": "16",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "INR",
                "total": "13850.00",
                "base": "12000.00",
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": "13850.00"
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": true
            },
            "validatingAirlineCodes": [
                "AI"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "INR",
                        "total": "13850.00",
                        "base": "12000.00"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "15",
                            "cabin": "ECONOMY",
                            "fareBasis": "YSAVER",
                            "class": "Y",
                            "includedCheckedBags": {
                                "weight": 25,
                                "weightUnit": "KG"
                            }
                        },
                        {
                            "segmentId": "16",
                            "cabin": "ECONOMY",
                            "fareBasis": "YSAVER",
                            "class": "Y",
                            "includedCheckedBags": {
                                "weight": 25,
                                "weightUnit": "KG"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "type": "flight-offer",
            "id": "9",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "lastTicketingDate": "2025-04-08",
            "lastTicketingDateTime": "2025-04-08",
            "numberOfBookableSeats": 7,
            "itineraries": [
                {
                    "duration": "PT2H50M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "CCU",
                                "terminal": "2",
                                "at": "2025-04-15T19:15:00"
                            },
                            "arrival": {
                                "iataCode": "BOM",
                                "terminal": "1",
                                "at": "2025-04-15T22:05:00"
                            },
                            "carrierCode": "6E",
                            "number": "278",
                            "aircraft": {
                                "code": "320"
                            },
                            "operating": {
                                "carrierCode": "6E"
                            },
                            "duration": "PT2H50M",
                            "id": "17",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                },
                {
                    "duration": "PT2H45M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "BOM",
                                "terminal": "1",
                                "at": "2025-04-22T15:30:00"
                            },
                            "arrival": {
                                "iataCode": "CCU",
                                "terminal": "2",
                                "at": "2025-04-22T18:15:00"
                            },
                            "carrierCode": "6E",
                            "number": "279",
                            "aircraft": {
                                "code": "320"
                            },
                            "operating": {
                                "carrierCode": "6E"
                            },
                            "duration": "PT2H45M",
                            "id": "18",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "INR",
                "total": "10950.00",
                "base": "9400.00",
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": "10950.00"
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": false
            },
            "validatingAirlineCodes": [
                "6E"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "INR",
                        "total": "10950.00",
                        "base": "9400.00"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "17",
                            "cabin": "ECONOMY",
                            "fareBasis": "SAVER",
                            "class": "S",
                            "includedCheckedBags": {
                                "weight": 15,
                                "weightUnit": "KG"
                            }
                        },
                        {
                            "segmentId": "18",
                            "cabin": "ECONOMY",
                            "fareBasis": "SAVER",
                            "class": "S",
                            "includedCheckedBags": {
                                "weight": 15,
                                "weightUnit": "KG"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "type": "flight-offer",
            "id": "10",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "lastTicketingDate": "2025-04-08",
            "lastTicketingDateTime": "2025-04-08",
            "numberOfBookableSeats": 5,
            "itineraries": [
                {
                    "duration": "PT1H35M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "BOM",
                                "terminal": "1",
                                "at": "2025-04-15T06:05:00"
                            },
                            "arrival": {
                                "iataCode": "BLR",
                                "terminal": "1",
                                "at": "2025-04-15T07:40:00"
                            },
                            "carrierCode": "6E",
                            "number": "191",
                            "aircraft": {
                                "code": "320"
                            },
                            "operating": {
                                "carrierCode": "6E"
                            },
                            "duration": "PT1H35M",
                            "id": "19",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                },
                {
                    "duration": "PT1H40M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "BLR",
                                "terminal": "1",
                                "at": "2025-04-22T20:10:00"
                            },
                            "arrival": {
                                "iataCode": "BOM",
                                "terminal": "1",
                                "at": "2025-04-22T21:50:00"
                            },
                            "carrierCode": "6E",
                            "number": "192",
                            "aircraft": {
                                "code": "320"
                            },
                            "operating": {
                                "carrierCode": "6E"
                            },
                            "duration": "PT1H40M",
                            "id": "20",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "INR",
                "total": "8150.00",
                "base": "6900.00",
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": "8150.00"
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": false
            },
            "validatingAirlineCodes": [
                "6E"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "INR",
                        "total": "8150.00",
                        "base": "6900.00"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "19",
                            "cabin": "ECONOMY",
                            "fareBasis": "SAVER",
                            "class": "S",
                            "includedCheckedBags": {
                                "weight": 15,
                                "weightUnit": "KG"
                            }
                        },
                        {
                            "segmentId": "20",
                            "cabin": "ECONOMY",
                            "fareBasis": "SAVER",
                            "class": "S",
                            "includedCheckedBags": {
                                "weight": 15,
                                "weightUnit": "KG"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "type": "flight-offer",
            "id": "11",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "lastTicketingDate": "2025-04-08",
            "lastTicketingDateTime": "2025-04-08",
            "numberOfBookableSeats": 4,
            "itineraries": [
                {
                    "duration": "PT1H40M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "BLR",
                                "terminal": "1",
                                "at": "2025-04-15T11:25:00"
                            },
                            "arrival": {
                                "iataCode": "BOM",
                                "terminal": "2",
                                "at": "2025-04-15T13:05:00"
                            },
                            "carrierCode": "UK",
                            "number": "612",
                            "aircraft": {
                                "code": "320"
                            },
                            "operating": {
                                "carrierCode": "UK"
                            },
                            "duration": "PT1H40M",
                            "id": "21",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                },
                {
                    "duration": "PT1H45M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "BOM",
                                "terminal": "2",
                                "at": "2025-04-22T08:15:00"
                            },
                            "arrival": {
                                "iataCode": "BLR",
                                "terminal": "1",
                                "at": "2025-04-22T10:00:00"
                            },
                            "carrierCode": "UK",
                            "number": "611",
                            "aircraft": {
                                "code": "320"
                            },
                            "operating": {
                                "carrierCode": "UK"
                            },
                            "duration": "PT1H45M",
                            "id": "22",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "INR",
                "total": "11450.00",
                "base": "9750.00",
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": "11450.00"
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": true
            },
            "validatingAirlineCodes": [
                "UK"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "INR",
                        "total": "11450.00",
                        "base": "9750.00"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "21",
                            "cabin": "ECONOMY",
                            "fareBasis": "YFLEX",
                            "class": "Y",
                            "includedCheckedBags": {
                                "weight": 20,
                                "weightUnit": "KG"
                            }
                        },
                        {
                            "segmentId": "22",
                            "cabin": "ECONOMY",
                            "fareBasis": "YFLEX",
                            "class": "Y",
                            "includedCheckedBags": {
                                "weight": 20,
                                "weightUnit": "KG"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "type": "flight-offer",
            "id": "12",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "lastTicketingDate": "2025-04-08",
            "lastTicketingDateTime": "2025-04-08",
            "numberOfBookableSeats": 6,
            "itineraries": [
                {
                    "duration": "PT2H50M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "CCU",
                                "terminal": "2",
                                "at": "2025-04-15T08:05:00"
                            },
                            "arrival": {
                                "iataCode": "BLR",
                                "terminal": "1",
                                "at": "2025-04-15T10:55:00"
                            },
                            "carrierCode": "AI",
                            "number": "773",
                            "aircraft": {
                                "code": "321"
                            },
                            "operating": {
                                "carrierCode": "AI"
                            },
                            "duration": "PT2H50M",
                            "id": "23",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                },
                {
                    "duration": "PT2H45M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "BLR",
                                "terminal": "1",
                                "at": "2025-04-22T14:10:00"
                            },
                            "arrival": {
                                "iataCode": "CCU",
                                "terminal": "2",
                                "at": "2025-04-22T16:55:00"
                            },
                            "carrierCode": "AI",
                            "number": "774",
                            "aircraft": {
                                "code": "320"
                            },
                            "operating": {
                                "carrierCode": "AI"
                            },
                            "duration": "PT2H45M",
                            "id": "24",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "INR",
                "total": "14250.00",
                "base": "12350.00",
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": "14250.00"
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": true
            },
            "validatingAirlineCodes": [
                "AI"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "INR",
                        "total": "14250.00",
                        "base": "12350.00"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "23",
                            "cabin": "ECONOMY",
                            "fareBasis": "YSAVER",
                            "class": "Y",
                            "includedCheckedBags": {
                                "weight": 25,
                                "weightUnit": "KG"
                            }
                        },
                        {
                            "segmentId": "24",
                            "cabin": "ECONOMY",
                            "fareBasis": "YSAVER",
                            "class": "Y",
                            "includedCheckedBags": {
                                "weight": 25,
                                "weightUnit": "KG"
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
