import { evento } from '../../invitacion'
import { useEffect, useRef } from 'react';
import { createScope, utils, animate, onScroll, type Scope } from '../../lib/anime.esm.min.js';
import './location.css';
import Button from '../Button';
import hacienda from '../../assets/images/hacienda.webp';

const Location = () => {
    const root = useRef<HTMLDivElement>(null);
    const scope = useRef<Scope | null>(null); 

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        scope.current = createScope({ root })
        scope.current.add(() => {
            const details = utils.$('.location__content, .location__actions');
            animate(details, {
                y: [10, 0],
                opacity: [0.8, 1],
                duration: 400,
                ease: 'easeOutQuad',
                autoplay: onScroll({ target: root.current!, enter: 'bottom top' })
            });
        });

        return () => scope.current?.revert();
    }, []);

    const url = /^https?:\/\//i.test(evento.mapa) ? evento.mapa : (evento.direccion ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent([evento.lugar, evento.direccion].filter(Boolean).join(', ')) : '')
    const openLocation = () => { if (url) window.open(url, '_blank', 'noopener,noreferrer') }

    return (
        <section className="section location" ref={root}>
            <figure className="location__bg">
                <img className="location__bg-image" src={hacienda} alt="" />
            </figure>
            <div className="section__container location__container">
                <div className="location__content">
                    <h3 className="location__title">La celebración</h3>
                    <h4 className="location__subtitle">{evento.lugar || 'Lugar por confirmar'}</h4>
                    <p className="location__address">{[evento.direccion, evento.hora || evento.fechaISO.match(/T(\d{2}:\d{2})/)?.[1]].filter(Boolean).join(' · ')}</p>
                </div>
                <div className="location__actions">
                    {url && <Button label="Ver ubicación" icon="tabler:map-pin-heart" onClick={() => openLocation()} />}
                </div>
            </div>
        </section>
    );
};

export default Location;
