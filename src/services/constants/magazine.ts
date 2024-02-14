interface Magazine {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
  price: number;
  subscribed: boolean;
}

interface MagazineCardProps {
  magazine: Magazine;
  handleSubscribe: (id: number, subscribed: boolean) => Promise<void>;
}

export default MagazineCardProps;
