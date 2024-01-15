
import SEOType from '@/types/seo'

export default function SEO({ title, description }: SEOType) {
  document.title = title

  const des = document.querySelector('meta[name="description"]')
  if (des && description) {
    des.setAttribute('content', description)
  }
}