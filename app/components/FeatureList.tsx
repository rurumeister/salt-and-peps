import Image from "next/image";
import Link from "next/link";
import { Feature } from "../interfaces/album";

const FeatureList = ({ features }: { features: Feature[] }) => {
  return (
    <div className="g:pl-5 w-full min-h-screen flex flex-col">
      <h2 className="block lg:pt-5">Features: Images are credited to Peps.</h2>
      <div className="grid grid-cols-1 gap-2 pt-5">
        {features.map((feature, index) => (
          <Link
            href={feature.link}
            key={index}
            target="_blank"
            aria-label={`Link to ${feature.title}`}
          >
            <div className="flex flex-col md:flex-row items-center space-x-4 p-4 border rounded-lg transition-shadow duration-300 hover:shadow-md group">
              <div className="relative flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={feature.coverPhoto}
                  alt={feature.title}
                  width={280}
                  height={146.7}
                  className="transition-transform duration-300 transform"
                  style={{ height: "auto" }}
                />
                <div className="absolute inset-0 bg-brown opacity-25 transition-opacity duration-500 group-hover:opacity-0"></div>
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg font-bold">
                  {feature.author}: {feature.title}
                </h2>
                <p className="text-gray-500">
                  {new Date(feature.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .bg-brown {
          background-color: #3c2e2e;
        }
      `}</style>
    </div>
  );
};

export default FeatureList;
