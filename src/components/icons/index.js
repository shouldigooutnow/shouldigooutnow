import React from 'react'
import classNames from 'classnames'

export const Trash = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className={props.className}
    width={24}
    height={24}
    onClick={props.onClick}
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
)

export const Heart = props => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 20 20" className={props.className} fill="currentColor">
    <path
      fillRule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clipRule="evenodd"
    />
  </svg>
)

export const Github = props => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" className={props.className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
    />
  </svg>
)

export const ExternalLink = props => (
  <svg
    width={20}
    height={20}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={props.className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
)

export const EyeOff = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width={16} height={16}>
    <path
      fillRule="evenodd"
      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
      clipRule="evenodd"
    />
    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
  </svg>
)

export const Eye = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width={16} height={16}>
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path
      fillRule="evenodd"
      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
      clipRule="evenodd"
    />
  </svg>
)

export const Warning = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    width={16}
    height={16}
    className={classNames('text-yellow-600', props.className)}
  >
    <path
      fillRule="evenodd"
      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
)

export const FaceMask = ({
  stringColor = '#338f7c',
  maskColor = '#26b899',
  maskTopColor = '#80cbb7',
  maskInnerColor = '#149f84',
  ...props
}) => {
  return (
    <svg height="24" viewBox="0 0 60 42" width="24" xmlns="http://www.w3.org/2000/svg" className={props.className}>
      <g id="Page-1" fill="none" fillRule="evenodd">
        <g id="022---Surgical-Mask" fillRule="nonzero">
          <path
            id="Shape"
            d="m11.981 29.007c-2.58092555-.0259935-5.09010651-.8527199-7.181-2.366-2.91581786-1.9229831-4.70805371-5.149381-4.8-8.641v-5c0-2.209139 1.790861-4 4-4h6c.5522847 0 1 .44771525 1 1 0 .5522847-.4477153 1-1 1h-6c-1.1045695 0-2 .8954305-2 2v5c.09750387 2.8434994 1.57641504 5.4605226 3.962 7.011 2.54050444 1.9071405 5.8440154 2.4740415 8.875 1.523.3405088-.1304032.7250044-.0651348 1.0034071.1703291.2784026.2354639.4065772.6037954.3344937.9612241-.0720835.3574286-.332998.6472915-.6809008.7564468-1.1299815.3903359-2.3175039.5880872-3.513.585z"
            fill={stringColor}
          />
          <path
            id="Shape"
            d="m48.021 29.013c-1.8826521.0086821-3.7328533-.4901399-5.356-1.444-.4757933-.2805607-.6340606-.8937067-.3534999-1.3695.2805606-.4757932.8937066-.6340606 1.3694999-.3535 2.9575463 1.6328481 6.5669393 1.5383574 9.435-.247 2.8645626-1.4830739 4.7246792-4.3772234 4.884-7.599v-5c0-1.1045695-.8954305-2-2-2h-6c-.5522847 0-1-.4477153-1-1 0-.55228475.4477153-1 1-1h6c2.209139 0 4 1.790861 4 4v5c-.1585784 3.9400461-2.4036413 7.4973963-5.892 9.336-1.848522 1.0791076-3.9466466 1.6571518-6.087 1.677z"
            fill={stringColor}
          />
          <path
            id="Shape"
            d="m50 10v11c.0826421 10.6552976-7.8673329 19.6652693-18.45 20.91-1.0298493.120002-2.0701507.120002-3.1 0-10.5826671-1.2447307-18.53264211-10.2547024-18.45-20.91v-11l4-.01c5.0625164-.11034929 9.8038884-2.50308822 12.9-6.51.7551558-.93416074 1.8914044-1.47784337 3.0926175-1.47978394 1.201213-.00194057 2.3392123.53806799 3.0973825 1.46978394 3.0976142 4.01176514 7.8427542 6.40822627 12.91 6.52z"
            fill={maskColor}
          />
          <path
            id="Shape"
            d="m50 10v2l-4-.01c-5.0672458-.1117737-9.8123858-2.50823486-12.91-6.52-.7581702-.93171595-1.8961695-1.47172451-3.0973825-1.46978394-1.2012131.00194057-2.3374617.5456232-3.0926175 1.47978394-3.0961116 4.00691178-7.8374836 6.3996507-12.9 6.51l-4 .01v-2c.0032948-1.10320187.8967981-1.9967052 2-2h1.51c4.0155488-.04752901 7.7957131-1.90271168 10.29-5.05 1.51724-1.86650111 3.794622-2.95014881 6.2-2.95014881s4.68276 1.0836477 6.2 2.95014881c2.4942869 3.14728832 6.2744512 5.00247099 10.29 5.05h1.51c1.1032019.0032948 1.9967052.89679813 2 2z"
            fill={maskTopColor}
          />
          <g fill={maskInnerColor}>
            <path
              id="Shape"
              d="m30 25.988c-4.510601-.0016041-8.9948904-.6870598-13.3-2.033-.3411886-.1061079-.5998521-.3861776-.6785543-.7347095-.0787022-.348532.0345136-.712576.297-.955.2624865-.2424241.6343657-.3263984.9755543-.2202905 8.2706401 2.589997 17.1353599 2.589997 25.406 0 .3411886-.1061079.7130678-.0221336.9755543.2202905.2624864.242424.3757022.606468.297.955-.0787022.3485319-.3373657.6286016-.6785543.7347095-4.3031897 1.3453409-8.7854106 2.0307896-13.294 2.033z"
            />
            <path
              id="Shape"
              d="m30 18.994c-4.4040114.0033977-8.8017237-.3329333-13.154-1.006-.5400995-.0907439-.9067252-.5990531-.8223782-1.1401885s.5882827-.9137498 1.1303782-.8358115c8.513904 1.3099961 17.178096 1.3099961 25.692 0 .3551081-.0596629.714872.0761988.9418979.3556995.227026.2795007.2862528.6594753.1550617.9948114-.131191.3353362-.4325391.5742457-.7889596.6254891-4.3522763.6730667-8.7499886 1.0093977-13.154 1.006z"
            />
            <path
              id="Shape"
              d="m30 34.007c-4.6527672-.0135436-9.2429568-1.0730021-13.431-3.1-.346031-.1387965-.5861159-.458566-.6228545-.8295811s.1359703-.7316602.4480604-.9356251c.3120902-.2039649.7117318-.2173764 1.0367941-.0347938 7.9313222 3.8750661 17.2066778 3.8750661 25.138 0 .3250623-.1825826.7247039-.1691711 1.0367941.0347938.3120901.2039649.484799.56461.4480604.9356251s-.2768235.6907846-.6228545.8295811c-4.1880432 2.0269979-8.7782328 3.0864564-13.431 3.1z"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

export const QuestionMark = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 17 17" fill="currentColor" height="18" width="18" {...props}>
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
    />
  </svg>
)
