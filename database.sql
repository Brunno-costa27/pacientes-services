--
-- PostgreSQL database dump
--

-- Dumped from database version 12.8 (Ubuntu 12.8-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.8 (Ubuntu 12.8-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cadastro; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cadastro (
    id_cadastro integer NOT NULL,
    medicamento character varying(100) NOT NULL,
    medico character varying(101) NOT NULL,
    quantidade integer NOT NULL,
    id_login numeric NOT NULL,
    create_date date
);


ALTER TABLE public.cadastro OWNER TO postgres;

--
-- Name: cadastro_id_cadastro_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cadastro_id_cadastro_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cadastro_id_cadastro_seq OWNER TO postgres;

--
-- Name: cadastro_id_cadastro_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cadastro_id_cadastro_seq OWNED BY public.cadastro.id_cadastro;


--
-- Name: login; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.login (
    id numeric NOT NULL,
    nome character varying(50) NOT NULL,
    email character varying(200) NOT NULL
);


ALTER TABLE public.login OWNER TO postgres;

--
-- Name: login_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.login_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.login_id_seq OWNER TO postgres;

--
-- Name: login_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.login_id_seq OWNED BY public.login.id;


--
-- Name: pacientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pacientes (
    id integer NOT NULL,
    nome character varying(30) NOT NULL,
    idade integer NOT NULL,
    endereco character varying(50) NOT NULL
);


ALTER TABLE public.pacientes OWNER TO postgres;

--
-- Name: cadastro id_cadastro; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cadastro ALTER COLUMN id_cadastro SET DEFAULT nextval('public.cadastro_id_cadastro_seq'::regclass);


--
-- Name: login id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.login ALTER COLUMN id SET DEFAULT nextval('public.login_id_seq'::regclass);


--
-- Data for Name: cadastro; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cadastro (id_cadastro, medicamento, medico, quantidade, id_login, create_date) FROM stdin;
1	dipirona	Dr.andré	2	1	\N
2	dorflex	Dr.andré	6	1	\N
4	loratadina	Dr. piu	1	104713370588415538011	2019-05-02
\.


--
-- Data for Name: login; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.login (id, nome, email) FROM stdin;
3	maria	1234567
4	julia	1234
5	dani	undefined
6	dani	123
7	paula	123
8	paula	123
9	diego	123
10	ryan	123
11	dede	123
12	dede	123
13	Franklin	123
14	ryan	123
15	undefined	123
16	joão	123
17	dede	123
18	dede	123
19	zilma	123
20	zilma	123
23	paulinha	123
1	Ana Paula	12345
24	undefined	undefined
25	brunno	undefined
26	bel	9999
1111111111111111111	ana paula	anapaula@gmail.com
111111111111111111111111111	ana paula	anapaula@gmail.com
104713370588415538011	brunno costa	sbrunno.costa@gmail.com
103157997535033102670	Sebastião Brunno da Costa Gomes	brunno.costa@escolar.ifrn.edu.br
100872447900036976728	Brunno costa	brunno.siasp@gmail.com
99	rael ou benecio	rael@gmail.com
\.


--
-- Data for Name: pacientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pacientes (id, nome, idade, endereco) FROM stdin;
1	paula	22	rua são joão
3	iza	23	rua centro
4	iza	23	rua qualquer
5	iza	23	rua qualquer
10	dani	100	rua são joão
\.


--
-- Name: cadastro_id_cadastro_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cadastro_id_cadastro_seq', 1, false);


--
-- Name: login_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.login_id_seq', 26, true);


--
-- Name: cadastro cadastro_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cadastro
    ADD CONSTRAINT cadastro_pkey PRIMARY KEY (id_cadastro);


--
-- Name: login login_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_pkey PRIMARY KEY (id);


--
-- Name: pacientes pacientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT pacientes_pkey PRIMARY KEY (id);


--
-- Name: cadastro cadastro_id_login_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cadastro
    ADD CONSTRAINT cadastro_id_login_fkey FOREIGN KEY (id_login) REFERENCES public.login(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

