export interface ICategory {
  image: string;
  name: string;
  title: string;
}

export interface IProjects {
  image: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  duration: string;
}

//
export interface IReviews {
  name: string;
  designation: string;
  comment: string;
}

export interface IServices {
  _id: string;
  image: string;
  title: string;
  price: number;
  contact: string;
  rating: number;
  description: string;
  reviews: IReviews[];
  category: string;
  isBooked?: boolean;
}

//

export interface ICustomerReviews {
  name: string;
  designation: string;
  comment: string;
  rating: number;
  img?: string;
}

//

interface ISocial {
  facebook: string;
  twitter: string;
  behance: string;
  instagram: string;
}

export interface ITeams {
  name: string;
  designation: string;
  image: string;
  social_links: ISocial;
}
