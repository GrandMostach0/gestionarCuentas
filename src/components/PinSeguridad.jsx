import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NUMEROS = [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, '←'];
const PIN_KEY = 'app_pin';

function PinSeguridad() {

    const navigate = useNavigate();
    const pinGuardado = localStorage.getItem(PIN_KEY);

    const [fase, setFase] = useState(pinGuardado ? 'validar' : 'crear');
    const [pin, setPin] = useState([]);
    const [pinTemp, setPinTemp] = useState(null);
    const [shake, setShake] = useState(false);
    const [mensaje, setMensaje] = useState('');

    const titulos = { crear: 'Crea tu PIN', confirmar: 'Confirma tu PIN', validar: 'Ingresa tu PIN' };

    useEffect(() => {
        if (sessionStorage.getItem('app_session_active') === 'true') {
            navigate('/dashboard', { replace: true });
        }
    }, [navigate]);

    function errorShake(msg) {
        setMensaje(msg);
        setShake(true);
        setTimeout(() => { setShake(false); setPin([]); }, 600);
    }

    function procesarPin(nuevoPin, estadoActual) {
        const pinStr = nuevoPin.join('');

        if (estadoActual.fase === 'crear') {
            setPinTemp(pinStr);
            setTimeout(() => { setPin([]); setMensaje(''); setFase('confirmar'); }, 300);

        } else if (estadoActual.fase === 'confirmar') {
            if (pinStr === estadoActual.pinTemp) {
                localStorage.setItem(PIN_KEY, pinStr);

                sessionStorage.setItem('app_session_active', 'true');
                setMensaje('✓ PIN creado');
                setTimeout(() => navigate('/dashboard'), 600);
            } else {
                errorShake('Los PINs no coinciden');
                setTimeout(() => { setFase('crear'); setPinTemp(null); }, 650);
            }

        } else if (estadoActual.fase === 'validar') {
            if (pinStr === estadoActual.pinGuardado) {
                setMensaje('✓ Acceso concedido');  
                sessionStorage.setItem('app_session_active', 'true');
                setTimeout(() => navigate('/dashboard'), 500);
            } else {
                errorShake('PIN incorrecto');
            }
        }
    }

    function agregarDigito(num, pinActual, estadoActual) {
        if (pinActual.length >= 4) return;
        const nuevo = [...pinActual, num];
        setPin(nuevo);
        if (nuevo.length === 4) procesarPin(nuevo, estadoActual);
    }

    function borrar() {
        setPin(prev => prev.slice(0, -1));
        setMensaje('');
    }

    // escuchar teclado — se recrea cuando cambia el estado relevante
    useEffect(() => {
        const estado = { fase, pinTemp, pinGuardado };
        function handleKey(e) {
            if (e.key >= '0' && e.key <= '9') {
                setPin(prev => {
                    if (prev.length >= 4) return prev;
                    const nuevo = [...prev, Number(e.key)];
                    if (nuevo.length === 4) procesarPin(nuevo, estado);
                    return nuevo;
                });
            } else if (e.key === 'Backspace') {
                borrar();
            }
        }
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [fase, pinTemp, pinGuardado]);

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-950 gap-8">

            <h1 className="text-white text-2xl font-semibold tracking-wide">
                {titulos[fase]}
            </h1>

            {/* 4 círculos */}
            <div className={`flex gap-4 ${shake ? 'animate-shake' : ''}`}>
                {[0, 1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className={`w-5 h-5 rounded-full border-2 transition-all duration-200
                            ${pin[i] !== undefined
                                ? 'bg-indigo-500 border-indigo-500 scale-110'
                                : 'bg-transparent border-gray-500'
                            }`}
                    />
                ))}
            </div>

            {/* mensaje */}
            <p className={`text-sm h-4 ${mensaje.startsWith('✓') ? 'text-green-400' : 'text-red-400'}`}>
                {mensaje}
            </p>

            {/* teclado */}
            <div className="grid grid-cols-3 gap-3">
                {NUMEROS.map((n, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            if (n === '←') borrar();
                            else if (n !== null) agregarDigito(n, pin, { fase, pinTemp, pinGuardado });
                        }}
                        disabled={n === null}
                        className={`w-16 h-16 rounded-full text-xl font-medium transition-all duration-150
                            ${n === null
                                ? 'invisible'
                                : n === '←'
                                    ? 'text-gray-400 hover:bg-gray-800 active:scale-95'
                                    : 'text-white bg-gray-800 hover:bg-gray-700 active:scale-95 active:bg-indigo-600'
                            }`}
                    >
                        {n}
                    </button>
                ))}
            </div>

            {fase === 'validar' && (
                <button
                    onClick={() => { localStorage.removeItem(PIN_KEY); setFase('crear'); setPin([]); setMensaje(''); }}
                    className="text-xs text-gray-600 hover:text-gray-400 mt-2"
                >
                    ¿Olvidaste tu PIN? Crear nuevo
                </button>
            )}
        </div>
    );
}

export default PinSeguridad;
