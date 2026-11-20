import { evento } from '../../invitacion'
import { useEffect, useRef } from "react";
import { createScope, utils, animate, onScroll, type Scope, stagger } from '../../lib/anime.esm.min.js';
import { OrnamentFlower } from '../Ornaments';
import './parents.css';

const Parents = () => {
    const root = useRef<HTMLDivElement>(null);
    const scope = useRef<Scope | null>(null);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        scope.current = createScope({ root })
        scope.current.add(() => {
            const $title = utils.$('.parents__title');
            const $items = utils.$('.parents__item-name');
            const $ornament = utils.$('.parents__ornament');

            utils.set($title, {
                y: 100,
                opacity: 0,
                filter: 'blur(2px)'
            });
            animate($title, {
                y: [100, 0],
                opacity: [0, 1],
                filter: ['blur(2px)', 'blur(0px)'],
                duration: 1000,
                delay: 0,
                ease: 'easeOutQuad',
                autoplay: onScroll({
                    enter: 'bottom-=10% top',
                    leave: 'top+=10% bottom',
                    debug: false,
                })
            });
            utils.set($items, {
                y: 100,
                opacity: 0,
                filter: 'blur(2px)'
            });
            animate($items, {
                y: [100, 0],
                opacity: [0, 1],
                filter: ['blur(2px)', 'blur(0px)'],
                duration: 1000,
                delay: stagger(100, { start: 0 } ),
                ease: 'easeOutQuad',
                autoplay: onScroll({
                    enter: 'bottom-=10% top',
                    leave: 'top+=10% bottom',
                    debug: false,
                })
            });
            utils.set($ornament, {
                scale: 0,
                filter: 'blur(2px)'
            });
            animate($ornament, {
                scale: [0, 1],
                filter: ['blur(2px)', 'blur(0px)'],
                duration: 1000,
                delay: 750,
                ease: 'easeOut',
                autoplay: onScroll({
                    enter: 'bottom-=10% top',
                    leave: 'top+=10% bottom',
                    debug: false,
                })
            });
        });

        return () => scope.current?.revert();
    }, []);

    return (
        <section className="section parents" ref={root}>
            <div className="section__container parents__container">
                <h3 className="parents__title">Con la bendición de mi familia</h3>
                <OrnamentFlower className="parents__ornament" />
                <p className="parents__item-name">{evento.familia || 'Gracias por acompañarme mientras crezco y por celebrar conmigo cada nuevo comienzo.'}</p>
            </div>
        </section>
    );
};

export default Parents;
