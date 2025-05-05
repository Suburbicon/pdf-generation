import { MjmlRaw, MjmlSpacer, MjmlText, MjmlWrapper } from '@faire/mjml-react';
import AppGalleryBadgeImage from '~/src/assets/images/app-gallery.png';
import AppStoreBadgeImage from '~/src/assets/images/app-store.png';
import GooglePlayBadgeImage from '~/src/assets/images/google-play.png';
import VKImage from '~/src/assets/images/socials/vk-mono.png';
import TwitterImage from '~/src/assets/images/socials/twitter-mono.png';
import FBImage from '~/src/assets/images/socials/fb-mono.png';
import IGImage from '~/src/assets/images/socials/ig-mono.png';
import YoutubeImage from '~/src/assets/images/socials/youtube-mono.png';
import { theme } from '~/src/shared/config/aviata/theme.ts';

const DOWNLOAD_BADGES = [
  {
    img: GooglePlayBadgeImage,
    href: 'https://redirect.appmetrica.yandex.com/serve/457723602477782574',
    width: 108,
    height: 32,
  },
  {
    img: AppStoreBadgeImage,
    href: 'https://redirect.appmetrica.yandex.com/serve/386477597556559109',
    width: 97,
    height: 32,
  },
  {
    img: AppGalleryBadgeImage,
    href: 'https://appgallery.huawei.com/app/C102728917?sharePrepath=ag&locale=ru_RU&source=appshare&subsource=C102728917',
    width: 107,
    height: 32,
  },
];

const SOCIALS = [
  {
    img: VKImage,
    href: 'https://vk.com/aviata',
  },
  {
    img: TwitterImage,
    href: 'https://twitter.com/Aviatakz',
  },
  {
    img: FBImage,
    href: 'https://www.facebook.com/aviata.me',
  },
  {
    img: IGImage,
    href: 'https://www.instagram.com/aviatakz/',
  },
  {
    img: YoutubeImage,
    href: 'https://www.youtube.com/channel/UCLAK02FsahxVtXkzViuWhOg',
  },
];

export const Footer: React.FC = () => {
  return (
    <MjmlWrapper
      backgroundColor={theme.colors.white}
      borderRadius="12px"
      padding="40px 16px"
    >
      <MjmlRaw>
        <table align="center">
          <tr>
            {SOCIALS.map((social, index) => (
              <td key={index}>
                <a href={social.href}>
                  <img src={social.img} width={32} height={32} />
                </a>
              </td>
            ))}
          </tr>
        </table>
      </MjmlRaw>

      <MjmlSpacer height="20px" />

      <MjmlRaw>
        <table align="center">
          <tr>
            {DOWNLOAD_BADGES.map((badge, index) => (
              <td key={index}>
                <a href={badge.href}>
                  <img
                    src={badge.img}
                    width={badge.width}
                    height={badge.height}
                  />
                </a>
              </td>
            ))}
          </tr>
        </table>
      </MjmlRaw>

      <MjmlSpacer height="20px" />

      <MjmlText align="center" fontSize="14px" color={theme.colors.gray[500]}>
        Это письмо отправлено автоматически.
      </MjmlText>

      <MjmlText align="center" fontSize="14px" color={theme.colors.gray[500]}>
        Пожалуйста, не отвечайте на него.
      </MjmlText>
    </MjmlWrapper>
  );
};
