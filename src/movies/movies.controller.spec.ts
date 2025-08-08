import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { BadGatewayException, InternalServerErrorException } from '@nestjs/common';

jest.mock('axios');

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              if (key === 'TMDB_API_ACCESS_TOKEN') return 'mocked-token';
              if (key === 'TMDB_API_BASE_URL') return 'https://api.themoviedb.org/3';
            }),
          },
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });
  //-------------------- Import service success --------------------//
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //-------------------- Fecth data complete --------------------//
  it('should fetch popular movies page 2 successfully', async () => {
    const mockResponse = {
        "statusCode": 200,
        "data": {
            "page": 2,
            "results": [
                {
                    "adult": false,
                    "backdrop_path": "/oPgXVSdGR9dGwbmvIToOCMmsdc2.jpg",
                    "genre_ids": [
                        28,
                        53,
                        80
                    ],
                    "id": 541671,
                    "original_language": "en",
                    "original_title": "Ballerina",
                    "overview": "Taking place during the events of John Wick: Chapter 3 – Parabellum, Eve Macarro begins her training in the assassin traditions of the Ruska Roma.",
                    "popularity": 169.2009,
                    "poster_path": "/2VUmvqsHb6cEtdfscEA6fqqVzLg.jpg",
                    "release_date": "2025-06-04",
                    "title": "Ballerina",
                    "video": false,
                    "vote_average": 7.454,
                    "vote_count": 1254
                },
                {
                    "adult": false,
                    "backdrop_path": "/l3ycQYwWmbz7p8otwbomFDXIEhn.jpg",
                    "genre_ids": [
                        16,
                        14,
                        35,
                        10402,
                        10751
                    ],
                    "id": 803796,
                    "original_language": "en",
                    "original_title": "KPop Demon Hunters",
                    "overview": "When K-pop superstars Rumi, Mira and Zoey aren't selling out stadiums, they're using their secret powers to protect their fans from supernatural threats.",
                    "popularity": 166.8819,
                    "poster_path": "/22AouvwlhlXbe3nrFcjzL24bvWH.jpg",
                    "release_date": "2025-06-20",
                    "title": "KPop Demon Hunters",
                    "video": false,
                    "vote_average": 8.4,
                    "vote_count": 920
                },
                {
                    "adult": false,
                    "backdrop_path": "/xVSrVenIhbhT9DJioOkhmOlxJuq.jpg",
                    "genre_ids": [
                        27
                    ],
                    "id": 1452176,
                    "original_language": "en",
                    "original_title": "Abraham's Boys: A Dracula Story",
                    "overview": "Following the events of Dracula, Abraham van Helsing moves his two sons, Max and Rudy, to the US in an attempt to escape their past. It does not work.",
                    "popularity": 143.6004,
                    "poster_path": "/e10AbPwcJk5b7ja3MQUVr5wHEeq.jpg",
                    "release_date": "2025-07-11",
                    "title": "Abraham's Boys: A Dracula Story",
                    "video": false,
                    "vote_average": 4,
                    "vote_count": 7
                },
                {
                    "adult": false,
                    "backdrop_path": "/8or4S9BPhkeYK0vlKsPFee4JVWI.jpg",
                    "genre_ids": [
                        28,
                        18
                    ],
                    "id": 1315986,
                    "original_language": "en",
                    "original_title": "Man with No Past",
                    "overview": "Waking up in an unfamiliar city, a man with no memory must confront the mysteries of his own identity. However, his desperate search to uncover the past pits him against a powerful enemy, leading to a showdown that ultimately reveals the truth.",
                    "popularity": 136.5687,
                    "poster_path": "/eWHvROuznSzcxBAAkzX1X0Rmzoe.jpg",
                    "release_date": "2025-01-13",
                    "title": "Man with No Past",
                    "video": false,
                    "vote_average": 6.4,
                    "vote_count": 45
                },
                {
                    "adult": false,
                    "backdrop_path": "/wSdWEc1G3OUWg8HAzNLqOZ9Gd43.jpg",
                    "genre_ids": [
                        28,
                        878,
                        12
                    ],
                    "id": 986056,
                    "original_language": "en",
                    "original_title": "Thunderbolts*",
                    "overview": "After finding themselves ensnared in a death trap, seven disillusioned castoffs must embark on a dangerous mission that will force them to confront the darkest corners of their pasts.",
                    "popularity": 133.1304,
                    "poster_path": "/hqcexYHbiTBfDIdDWxrxPtVndBX.jpg",
                    "release_date": "2025-04-30",
                    "title": "Thunderbolts*",
                    "video": false,
                    "vote_average": 7.414,
                    "vote_count": 2133
                },
                {
                    "adult": false,
                    "backdrop_path": "/uIpJPDNFoeX0TVml9smPrs9KUVx.jpg",
                    "genre_ids": [
                        27,
                        9648
                    ],
                    "id": 574475,
                    "original_language": "en",
                    "original_title": "Final Destination Bloodlines",
                    "overview": "Plagued by a violent recurring nightmare, college student Stefanie heads home to track down the one person who might be able to break the cycle and save her family from the grisly demise that inevitably awaits them all.",
                    "popularity": 128.0278,
                    "poster_path": "/6WxhEvFsauuACfv8HyoVX6mZKFj.jpg",
                    "release_date": "2025-05-14",
                    "title": "Final Destination Bloodlines",
                    "video": false,
                    "vote_average": 7.2,
                    "vote_count": 1855
                },
                {
                    "adult": false,
                    "backdrop_path": "/9l6bcHNFLR2fcCBSPzEeqxiQhwU.jpg",
                    "genre_ids": [
                        28,
                        35,
                        80,
                        9648
                    ],
                    "id": 1374534,
                    "original_language": "nl",
                    "original_title": "Bad Boa's",
                    "overview": "When an overeager community officer and a reckless ex-detective are forced to team up, plenty of chaos ensues on the streets of Rotterdam.",
                    "popularity": 123.4389,
                    "poster_path": "/7bcndiaTgu1Kj5a6qyCmsWYdtI.jpg",
                    "release_date": "2025-07-10",
                    "title": "Almost Cops",
                    "video": false,
                    "vote_average": 5.892,
                    "vote_count": 116
                },
                {
                    "adult": false,
                    "backdrop_path": "/a6bItEVaxgphpMswho1wVRerv4r.jpg",
                    "genre_ids": [
                        28,
                        12,
                        53,
                        80
                    ],
                    "id": 7451,
                    "original_language": "en",
                    "original_title": "xXx",
                    "overview": "Xander Cage is your standard adrenaline junkie with no fear and a lousy attitude. When the US Government \"recruits\" him to go on a mission, he's not exactly thrilled. His mission: to gather information on an organization that may just be planning the destruction of the world, led by the nihilistic Yorgi.",
                    "popularity": 117.2736,
                    "poster_path": "/xeEw3eLeSFmJgXZzmF2Efww0q3s.jpg",
                    "release_date": "2002-08-09",
                    "title": "xXx",
                    "video": false,
                    "vote_average": 5.957,
                    "vote_count": 4498
                },
                {
                    "adult": false,
                    "backdrop_path": "/jvpkBenB6hv19WWYVlaiow8zklq.jpg",
                    "genre_ids": [
                        10751,
                        35,
                        80,
                        12,
                        16
                    ],
                    "id": 1175942,
                    "original_language": "en",
                    "original_title": "The Bad Guys 2",
                    "overview": "The now-reformed Bad Guys are trying (very, very hard) to be good, but instead find themselves hijacked into a high-stakes, globe-trotting heist, masterminded by a new team of criminals they never saw coming: The Bad Girls.",
                    "popularity": 105.6675,
                    "poster_path": "/26oSPnq0ct59l07QOXZKyzsiRtN.jpg",
                    "release_date": "2025-07-24",
                    "title": "The Bad Guys 2",
                    "video": false,
                    "vote_average": 7.705,
                    "vote_count": 39
                },
                {
                    "adult": false,
                    "backdrop_path": "/lSbblLngbeZIn6G4WXDcyQ6SLhw.jpg",
                    "genre_ids": [
                        28,
                        18
                    ],
                    "id": 911430,
                    "original_language": "en",
                    "original_title": "F1",
                    "overview": "Racing legend Sonny Hayes is coaxed out of retirement to lead a struggling Formula 1 team—and mentor a young hotshot driver—while chasing one more chance at glory.",
                    "popularity": 104.6713,
                    "poster_path": "/9JePWGvgg1t4BOojyZEVQdOWjXO.jpg",
                    "release_date": "2025-06-25",
                    "title": "F1",
                    "video": false,
                    "vote_average": 7.604,
                    "vote_count": 972
                },
                {
                    "adult": false,
                    "backdrop_path": "/f4ilsaK7n2H5bG0cezJTXxnvVxq.jpg",
                    "genre_ids": [
                        27
                    ],
                    "id": 1353328,
                    "original_language": "en",
                    "original_title": "Hook",
                    "overview": "Driven by a hallucinogenic drug and a thirst for revenge, James Hook murders John Darling and loses his hand to Peter Pan. Eighteen years later, Wendy, now married to Peter, has a daughter, Lily. Lily discovers Hook is her biological father, leading her to a remote birthday retreat. Hook escapes prison and embarks on a killing spree, targeting Lily and her friends at the manor.",
                    "popularity": 99.335,
                    "poster_path": "/uMCGeXaiCHQNBgh7em4Gaf73e0i.jpg",
                    "release_date": "2025-04-04",
                    "title": "Hook",
                    "video": false,
                    "vote_average": 4.4,
                    "vote_count": 5
                },
                {
                    "adult": false,
                    "backdrop_path": "/qj0GN10AC65FcJchKLTDmOFE15X.jpg",
                    "genre_ids": [
                        27
                    ],
                    "id": 1189735,
                    "original_language": "ga",
                    "original_title": "Fréamhacha",
                    "overview": "Care worker Shoo, who is haunted by a personal tragedy, is sent to a remote village to care for an agoraphobic woman, who fears both her neighbours and the Na Sídhe – sinister folkloric entities she believes abducted her decades before.",
                    "popularity": 97.0804,
                    "poster_path": "/pfLylbmY0uxQm6Sh63j6bpb7XB3.jpg",
                    "release_date": "2025-04-25",
                    "title": "Fréwaka",
                    "video": false,
                    "vote_average": 7,
                    "vote_count": 13
                },
                {
                    "adult": false,
                    "backdrop_path": "/wYbOd1YdpDonQUHwRCTCY2grSq4.jpg",
                    "genre_ids": [
                        16,
                        14,
                        12
                    ],
                    "id": 615453,
                    "original_language": "zh",
                    "original_title": "哪吒之魔童降世",
                    "overview": "A young boy is born as the reincarnation of a demonic power, into a society that hates and fears him. Destined by prophecy to bring destruction to the world, Nezha must choose between good and evil to see if he can change his fate.",
                    "popularity": 94.0748,
                    "poster_path": "/phM9bb6s9c60LA8qwsdk7U1N2cS.jpg",
                    "release_date": "2019-07-26",
                    "title": "Ne Zha",
                    "video": false,
                    "vote_average": 7.937,
                    "vote_count": 585
                },
                {
                    "adult": false,
                    "backdrop_path": "/u2ctOiURF9hL3hmXmEMHxcVPVrQ.jpg",
                    "genre_ids": [
                        27
                    ],
                    "id": 1242011,
                    "original_language": "en",
                    "original_title": "Together",
                    "overview": "With a move to the countryside already testing the limits of a couple's relationship, a supernatural encounter begins an extreme transformation of their love, their lives, and their flesh.",
                    "popularity": 93.0559,
                    "poster_path": "/inliWt3ukcpKDGPpEe2lRDLwK2r.jpg",
                    "release_date": "2025-07-28",
                    "title": "Together",
                    "video": false,
                    "vote_average": 7.559,
                    "vote_count": 85
                },
                {
                    "adult": false,
                    "backdrop_path": "/xPNDRM50a58uvv1il2GVZrtWjkZ.jpg",
                    "genre_ids": [
                        28,
                        12,
                        53
                    ],
                    "id": 575265,
                    "original_language": "en",
                    "original_title": "Mission: Impossible - The Final Reckoning",
                    "overview": "Ethan Hunt and team continue their search for the terrifying AI known as the Entity — which has infiltrated intelligence networks all over the globe — with the world's governments and a mysterious ghost from Hunt's past on their trail. Joined by new allies and armed with the means to shut the Entity down for good, Hunt is in a race against time to prevent the world as we know it from changing forever.",
                    "popularity": 92.7566,
                    "poster_path": "/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg",
                    "release_date": "2025-05-17",
                    "title": "Mission: Impossible - The Final Reckoning",
                    "video": false,
                    "vote_average": 7.2,
                    "vote_count": 991
                },
                {
                    "adult": false,
                    "backdrop_path": "/1wi1hcbl6KYqARjdQ4qrBWZdiau.jpg",
                    "genre_ids": [
                        28,
                        35,
                        80
                    ],
                    "id": 1035259,
                    "original_language": "en",
                    "original_title": "The Naked Gun",
                    "overview": "Only one man has the particular set of skills... to lead Police Squad and save the world: Lt. Frank Drebin Jr.",
                    "popularity": 91.0813,
                    "poster_path": "/rmwQ8GsdQ1M3LtemNWLErle2nBU.jpg",
                    "release_date": "2025-07-30",
                    "title": "The Naked Gun",
                    "video": false,
                    "vote_average": 7.2,
                    "vote_count": 109
                },
                {
                    "adult": false,
                    "backdrop_path": "/xVcffNU61CclEGgtiWP7KLIE2dm.jpg",
                    "genre_ids": [
                        27,
                        28,
                        14,
                        12
                    ],
                    "id": 1058537,
                    "original_language": "en",
                    "original_title": "Angels Fallen: Warriors of Peace",
                    "overview": "When an Iraq War veteran receives a calling from a higher power, he embarks on a mission to stop a fallen angel from raising an army of the dead to take over the world.",
                    "popularity": 87.0122,
                    "poster_path": "/dKdKUSGQ9E0G73WPr9xIHrofpkT.jpg",
                    "release_date": "2024-07-09",
                    "title": "Angels Fallen: Warriors of Peace",
                    "video": false,
                    "vote_average": 6,
                    "vote_count": 42
                },
                {
                    "adult": false,
                    "backdrop_path": "/kyqM6padQzZ1eYxv84i9smNvZAG.jpg",
                    "genre_ids": [
                        27,
                        9648
                    ],
                    "id": 1078605,
                    "original_language": "en",
                    "original_title": "Weapons",
                    "overview": "When all but one child from the same class mysteriously vanish on the same night at exactly the same time, a community is left questioning who or what is behind their disappearance.",
                    "popularity": 85.6763,
                    "poster_path": "/cpf7vsRZ0MYRQcnLWteD5jK9ymT.jpg",
                    "release_date": "2025-08-06",
                    "title": "Weapons",
                    "video": false,
                    "vote_average": 7.7,
                    "vote_count": 46
                },
                {
                    "adult": false,
                    "backdrop_path": "/fd9K7ZDfzRAcbLh8JlG4HIKbtuR.jpg",
                    "genre_ids": [
                        28,
                        14
                    ],
                    "id": 846422,
                    "original_language": "en",
                    "original_title": "The Old Guard 2",
                    "overview": "Andy and her team of immortal warriors fight with renewed purpose as they face a powerful new foe threatening their mission to protect humanity.",
                    "popularity": 85.188,
                    "poster_path": "/wqfu3bPLJaEWJVk3QOm0rKhxf1A.jpg",
                    "release_date": "2025-07-01",
                    "title": "The Old Guard 2",
                    "video": false,
                    "vote_average": 6.046,
                    "vote_count": 600
                },
                {
                    "adult": false,
                    "backdrop_path": "/azA5hRBmfrXpjel7xpL3iMBwgwW.jpg",
                    "genre_ids": [
                        10749,
                        18
                    ],
                    "id": 611251,
                    "original_language": "ja",
                    "original_title": "女高生トリオ 性感試験",
                    "overview": "Three high school girls. One is experienced, one has fantasies and one is curious. What more will they learn before graduation?",
                    "popularity": 84.5256,
                    "poster_path": "/9GSLrU0aoR6Pi2FQ0ttXV2thSxJ.jpg",
                    "release_date": "1977-02-23",
                    "title": "Jokōsei torio: seikan shiken",
                    "video": false,
                    "vote_average": 8,
                    "vote_count": 4
                }
            ],
            "total_pages": 51822,
            "total_results": 1036423
        }
    };

    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await service.fetchPopularMovies(2);

    expect(result).toEqual(mockResponse.data);
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/movie/popular',
      expect.objectContaining({
        headers: { Authorization: 'Bearer mocked-token', 'Content-Type': 'application/json;charset=utf-8' },
        params: { language: 'en-US', page: 2 },
      }),
    );
  });
   //-------------------- Input NaN value --------------------//
  it('should throw BadGatewayException for invalid page value (NaN)', async () => {
    try {
      await service.fetchPopularMovies(NaN);
    } catch (err) {
      expect(err).toBeInstanceOf(BadGatewayException);
      expect(err.message).toBe('Invalid page value: NaN. Page must be an integer between 1 and 500.');
    }
  });

   //-------------------- Input invalid page value (less than 1) --------------------//
  it('should throw BadGatewayException for invalid page value (less than 1)', async () => {
    try {
      await service.fetchPopularMovies(0);
    } catch (err) {
      expect(err).toBeInstanceOf(BadGatewayException);
      expect(err.message).toBe('Invalid page value: 0. Page must be an integer between 1 and 500.');
    }
  });
   //-------------------- Input invalid page value (greater than 500) --------------------//
  it('should throw BadGatewayException for invalid page value (greater than 500)', async () => {
    try {
      await service.fetchPopularMovies(501);
    } catch (err) {
      expect(err).toBeInstanceOf(BadGatewayException);
      expect(err.message).toBe('Invalid page value: 501. Page must be an integer between 1 and 500.');
    }
  });
});
