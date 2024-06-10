export interface NaverSearch {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: {
    address: string,
    category: string,
    description: string,
    link: string,
    mapx: number,
    mapy: number,
    roadAddress: string,
    telephone: string,
    title: string
  }[];
};

export interface SortedItemType {
  address: string,
  category: string,
  description: string,
  link: string,
  mapx: number,
  mapy: number,
  roadAddress: string,
  telephone: string,
  title: string,
  distance: number;
  latitude: number;
  longitude: number;
}

export interface NaverReverseGeocoding {
  status: {
    code: number,
    name: string,
    message: string
  },
  results: {
    name: string,
    code: {
      id: number,
      type: string,
      mappingId: string,
    },
    region: {
      area0: {
        name: string,
        coords: {
          center: {
            crs: string,
            x: number,
            y: number
          }
        }
      },
      area1: {
        name: string,
        coords: {
          center: {
            crs: string,
            x: number,
            y: number
          }
        }
      },
      area2: {
        name: string,
        coords: {
          center: {
            crs: string,
            x: number,
            y: number
          }
        }
      },
      area3: {
        name: string,
        coords: {
          center: {
            crs: string,
            x: number,
            y: number
          }
        }
      },
      area4: {
        name: string,
        coords: {
          center: {
            crs: string,
            x: number,
            y: number
          }
        }
      },
    },
    land: {
      addition0: {
        type: string,
        value: string,
      },
      addition1: {
        type: string,
        value: string,
      },
      addition2: {
        type: string,
        value: string,
      },
      addition3: {
        type: string,
        value: string,
      },
      addition4: {
        type: string,
        value: string,
      },
      type: string,
      name: string,
      number1: string,
      number2: string,
      coords: {
        center: {
          crs: string,
          x: number,
          y: number
        }
      }
    },
  }[]
}

export interface SearchResultParams {
  title: string,
  latitude: number,
  longitude: number,
}