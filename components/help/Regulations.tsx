
import Image from "next/image";
import cert from "@/lib/assets/Certificates image.png";

interface InfoCardProps {
  children: React.ReactNode;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ children, className }) => (
  <div
    className={`bg-primary/5 text-white/60 text-xs md:text-sm border border-white/5 rounded-xl p-4 md:p-6 leading-relaxed align-top text-left ${className}`}
  >
    {children}
  </div>
);

const Regulations = () => {
  return (
    <section className="w-full h-full text-white px-4 md:px-8 py-10 md:py-16 max-w-2xl mx-auto space-y-6 text-center overflow-y-auto custom-scrollbar">
      <h2 className="text-sm md:text-base font-semibold">
        The Financial Commission
      </h2>

      <div className="space-y-4">
        <InfoCard className="">
          The Financial Commission is an independent dispute resolution and
          self-regulatory organization that specializes in financial markets.
        </InfoCard>

        <p className="text-sm md:text-sm text-white/60 text-center leading-relaxed">
          InsiderOption LLC joined The Financial Commission as a registered
          Member in our commitment to high standards of client service and
          business practices.
        </p>

        <p className="text-xs md:text-sm text-white/60 text-center leading-relaxed">
          We strive to provide the best online trading experience, ensure
          precise order execution, and prompt and efficient resolution of
          clients’ concerns by an independent mediator.
        </p>

        <InfoCard>
          Our clients benefit from the insurance policy of The Compensation
          Fund, which provides coverage of up to €20 000 per client should a
          Member refuse to adhere to a judgment from The Financial Commission.
          For more information{" "}
          <a href="#" className="underline">
            click here
          </a>
          .
        </InfoCard>
      </div>

      <div className="rounded-xl overflow-hidden">
        <Image src={cert} alt="Certificate" className="w-full object-cover" />
        <button className="w-full bg-primary px-6 py-3 text-black font-semibold hover:bg-green-300 transition">
          View all certificates
        </button>
      </div>

      <div className="text-white/60 text-xs md:text-sm [&>p]:border-b [&>p]:border-b-white/20 [&>p]:py-3">
        <h2 className="text-sm md:text-base font-semibold text-white mt-4 p-2 border-b border-b-white/20">
          What does this mean for traders?
        </h2>
        <p>Protection for our clients during dispute process free of charge</p>
        <p>Compensation up to €20 000 per client for resolved disputes</p>
        <p>Educational materials and suggestions for all levels of experience</p>
      </div>
    </section>
  );
};

export default Regulations;
