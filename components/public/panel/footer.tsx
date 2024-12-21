
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { TwitterIcon } from "lucide-react";
import Company from "@/components/icons/company";
import { formatDate } from "@/helper/client";

export default function ClientFooter() {
  return (
    <footer className="w-full bg-clean-pool py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo and Hospital Name */}
          <div className="flex items-center  gap-3">
            {/* <Company className="h-8 w-8" /> */}
            <div className="text-white ">
              <h2 className="text-xl font-bold">Inovasi</h2>
              <p className="text-sm">Medika</p>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <h3 className="text-white text-lg font-medium">Media Sosial</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <SocialLink
                href="https://twitter.com"
                icon={<TwitterIcon />}
                label="Twitter"
              />
              <SocialLink
                href="https://linkedin.com"
                icon={<Linkedin />}
                label="LinkedIn"
              />
              <SocialLink
                href="https://instagram.com"
                icon={<Instagram />}
                label="Instagram"
              />
              <SocialLink
                href="https://youtube.com"
                icon={<Youtube />}
                label="YouTube"
              />
              <SocialLink
                href="https://facebook.com"
                icon={<Facebook />}
                label="Facebook"
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <p className="text-white text-center text-sm">
            Copyright @  Inovasi Medika Hospital.
          </p>
        </div>
      </div>
    </footer>
  );
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <Link
      href={href}
      className="w-10 h-10 bg-white rounded-full flex items-center justify-center transition-transform hover:scale-110 hover:shadow-lg"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <span className="text-[#6B8EF2]">{icon}</span>
    </Link>
  );
}
