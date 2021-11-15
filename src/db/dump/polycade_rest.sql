--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0 (Debian 14.0-1.pgdg110+1)
-- Dumped by pg_dump version 14.0 (Debian 14.0-1.pgdg110+1)

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
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE public.knex_migrations OWNER TO postgres;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_id_seq OWNER TO postgres;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.knex_migrations_lock (
    is_locked integer
);


ALTER TABLE public.knex_migrations_lock OWNER TO postgres;

--
-- Name: machine; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.machine (
    id integer NOT NULL,
    "machine-id" character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    "pm-id" character varying(255)
);


ALTER TABLE public.machine OWNER TO postgres;

--
-- Name: machine_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.machine_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.machine_id_seq OWNER TO postgres;

--
-- Name: machine_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.machine_id_seq OWNED BY public.machine.id;


--
-- Name: price; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.price (
    id integer NOT NULL,
    price character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    value character varying(255) NOT NULL,
    "pm-id" character varying(255) NOT NULL
);


ALTER TABLE public.price OWNER TO postgres;

--
-- Name: price_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.price_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.price_id_seq OWNER TO postgres;

--
-- Name: price_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.price_id_seq OWNED BY public.price.id;


--
-- Name: pricing-model; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."pricing-model" (
    id integer NOT NULL,
    "pm-id" character varying(255) NOT NULL,
    name character varying(255)
);


ALTER TABLE public."pricing-model" OWNER TO postgres;

--
-- Name: pricing-model_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."pricing-model_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."pricing-model_id_seq" OWNER TO postgres;

--
-- Name: pricing-model_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."pricing-model_id_seq" OWNED BY public."pricing-model".id;


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);


--
-- Name: machine id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.machine ALTER COLUMN id SET DEFAULT nextval('public.machine_id_seq'::regclass);


--
-- Name: price id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.price ALTER COLUMN id SET DEFAULT nextval('public.price_id_seq'::regclass);


--
-- Name: pricing-model id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pricing-model" ALTER COLUMN id SET DEFAULT nextval('public."pricing-model_id_seq"'::regclass);


--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.knex_migrations (id, name, batch, migration_time) FROM stdin;
9	20211106230158_pricing-model.js	1	2021-11-07 02:07:00.475+00
10	20211106230212_price.js	1	2021-11-07 02:07:00.483+00
11	20211106230216_machine.js	1	2021-11-07 02:07:00.492+00
\.


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.knex_migrations_lock (is_locked) FROM stdin;
0
\.


--
-- Data for Name: machine; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.machine (id, "machine-id", name, "pm-id") FROM stdin;
1	99ade105-dee1-49eb-8ac4-e4d272f89fba	Machine 1	3ba92095-3203-4888-a464-3c7d5d9acd7e
6	4111947a-6c58-4977-90fa-2caaaef88648	Machine 2	\N
7	57342663-909c-4adf-9829-6dd1a3aa9143	Machine 3	48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e
8	5632e1ec-46cb-4895-bc8b-a91644568cd5	Machine 4	4d40de8f-68f8-4160-a83a-665dbc92d154
\.


--
-- Data for Name: price; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.price (id, price, name, value, "pm-id") FROM stdin;
2	3	10 minutes	10	default_pricing
3	5	20 minutes	20	default_pricing
4	15	60 minutes	60	default_pricing
5	3	10 minutes	10	3ba92095-3203-4888-a464-3c7d5d9acd7e
6	5	20 minutes	20	3ba92095-3203-4888-a464-3c7d5d9acd7e
7	3	10 minutes	10	4d40de8f-68f8-4160-a83a-665dbc92d154
8	5	20 minutes	20	4d40de8f-68f8-4160-a83a-665dbc92d154
9	15	60 minutes	60	4d40de8f-68f8-4160-a83a-665dbc92d154
10	15	60 minutes	60	48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e
\.


--
-- Data for Name: pricing-model; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."pricing-model" (id, "pm-id", name) FROM stdin;
1	default_pricing	default_pricing
2	3ba92095-3203-4888-a464-3c7d5d9acd7e	Super Value Option
3	48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e	Long Play
4	4d40de8f-68f8-4160-a83a-665dbc92d154	Default
23	test123	test123
\.


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.knex_migrations_id_seq', 11, true);


--
-- Name: machine_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.machine_id_seq', 8, true);


--
-- Name: price_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.price_id_seq', 10, true);


--
-- Name: pricing-model_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."pricing-model_id_seq"', 23, true);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: machine machine_machine-id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.machine
    ADD CONSTRAINT "machine_machine-id_unique" UNIQUE ("machine-id");


--
-- Name: machine machine_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.machine
    ADD CONSTRAINT machine_pkey PRIMARY KEY (id);


--
-- Name: price price_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.price
    ADD CONSTRAINT price_pkey PRIMARY KEY (id);


--
-- Name: pricing-model pricing-model_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pricing-model"
    ADD CONSTRAINT "pricing-model_pkey" PRIMARY KEY (id);


--
-- Name: pricing-model pricing_model_pm-id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pricing-model"
    ADD CONSTRAINT "pricing_model_pm-id_unique" UNIQUE ("pm-id");


--
-- Name: machine machine_pm-id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.machine
    ADD CONSTRAINT "machine_pm-id_foreign" FOREIGN KEY ("pm-id") REFERENCES public."pricing-model"("pm-id");


--
-- Name: price price_pm-id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.price
    ADD CONSTRAINT "price_pm-id_foreign" FOREIGN KEY ("pm-id") REFERENCES public."pricing-model"("pm-id");


--
-- PostgreSQL database dump complete
--

