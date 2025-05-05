import { MjmlSpacer, MjmlText } from '@faire/mjml-react';
import { theme } from '~/src/shared/config/aviata/theme.ts';
import { SharedUi } from '../../shared/index.tsx';

export const RefundInfo: React.FC = () => {
  return (
    <SharedUi.Card sizeMode="medium">
      <MjmlText fontSize="18px" fontWeight="bold">
        Возврат билета дешевле, если делать это самостоятельно
      </MjmlText>
      <MjmlSpacer height="16px" />
      <MjmlText>
        Войдите в личный кабинет на сайте или в приложении, выберите нужный
        билет, посмотрите сумму к возврату и нажмите «Вернуть».
      </MjmlText>
      <MjmlSpacer height="16px" />
      <MjmlText>
        Вернуть билет нельзя, если:
        <ul style={{ margin: 0, padding: 0, listStylePosition: 'inside' }}>
          <li>
            вы обменяли его на стандартный билет в кассе или терминале КТЖ;
          </li>
          <li>
            до отправления поезда с начальной станции менее 1 часа, а электрички
            за 6 часов.
          </li>
        </ul>
      </MjmlText>
      <MjmlSpacer height="16px" />
      <MjmlText>
        <a
          href="https://aviata.kz/railways/refunds"
          style={{ textDecoration: 'none', color: theme.colors.purple[600] }}
          target="_blank"
        >
          Перейти к возврату
        </a>
      </MjmlText>
    </SharedUi.Card>
  );
};
