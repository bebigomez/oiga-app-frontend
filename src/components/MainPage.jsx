import { Link } from "react-router-dom";

const MainPage = () => {
  const collections = [
    {
      title: "Mujeres",
      buttonLabel: "Women's collection",
      description:
        "Empower your femininity with our diverse Women's Collection. From figure-flattering dresses to chic separates, discover luxury, sophistication, and individuality in every piece.",
      imageUrl:
        'https://res.cloudinary.com/dxvt08dc2/image/upload/v1712182294/modio/banners/women-banner_wqafpc.jpg',
      altText: 'Two women smiling.',
      collectionUrl: '/articulos?genero=1',
    },
    {
      title: "Hombres",
      buttonLabel: "Men's collection",
      description:
        "Refined yet versatile, our Men's Collection offers timeless classics alongside contemporary essentials. From tailored suits to streetwear-inspired pieces, elevate your style effortlessly for any occasion.",
      imageUrl:
        'https://res.cloudinary.com/dxvt08dc2/image/upload/v1712182294/modio/banners/men-banner_v7ycgs.jpg',
      altText: 'Man smiling at camera.',
      collectionUrl: '/articulos?genero=2',
    },
    {
      title: 'Niños',
      buttonLabel: 'Kids collection',
      description:
        "Inspire creativity and comfort with our playful Kids' Collection. From adorable onesies to trendy outfits, our durable and colorful designs ensure fun and fashion for every adventure.",
      imageUrl:
        'https://res.cloudinary.com/dxvt08dc2/image/upload/v1712182043/modio/banners/kids-banner_eabrfm.jpg',
      altText: 'Two kids talking.',
      collectionUrl: '/articulos?edad=3',
    },
  ];

  return (
    <>
      <section className="relative mb-20">
        <img
          className="h-[490px] md:h-[700px] md:w-full object-cover"
          src="/main_banner.avif"
          alt="A collection of colored shirts"
        ></img>
        <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center bg-white/50 backdrop-blur-md p-4 rounded-2xl text-black text-2xl md:text-4xl font-bold">
          Bienvenido a Oiga!
          <br />
          <br />
          Encuentra Artículos de segunda mano en buen estado.
        </h2>
      </section>
      <section className="mx-8">
        <h3 className="text-2xl md:text-3xl font-roboto-condensed font-semibold mb-10 text-center">
          VISITÁ NUESTRA COLECCIÓN
        </h3>
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {collections.map((item, index) => {
            return (
              <div key={index} className="relative">
                <img className="mb-2 w-full" src={item.imageUrl} alt={item.title} />
                <Link to={item.collectionUrl} className="absolute bottom-5 right-5 text-sm bg-zinc-900 md:text-xl text-white py-2 px-3.5">
                  Colección {item.title}  
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default MainPage;
