import React, { useState, useEffect } from 'react'
import { SponsorApi, Sponsor, Configuration } from '../../client-axios'
import * as Styled from './styled'
import * as CommonStyled from '../../styles/styled'

export const Sponsors: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesPerRow: 3,
    slidesToScroll: 1,
    vertical: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 8000,
    cssEase: 'linear',
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesPerRow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesPerRow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const [data, setData] = useState<Sponsor[]>([])

  useEffect(() => {
    new SponsorApi(new Configuration({ basePath: window.location.origin }))
      .apiV1SponsorsGet('codt2021')
      .then((res) => {
        setData(res.data)
      })
  }, [])

  return (
    <CommonStyled.Container>
      <Styled.CNDOSlider {...settings}>
        {data.map((sponsor) => (
          <Styled.Sponsor key={sponsor.id}>
            <Styled.SponsorImg src={sponsor.logo_url} />
          </Styled.Sponsor>
        ))}
      </Styled.CNDOSlider>
    </CommonStyled.Container>
  )
}
